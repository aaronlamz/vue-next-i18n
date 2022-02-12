import path from 'path'
import ts from 'rollup-plugin-typescript2'
import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

const pkg = require('./package.json')
const name = pkg.name

const banner = `/*!
  * ${pkg.name} v${pkg.version}
  * (c) ${new Date().getFullYear()} Aaron Lam
  * @license MIT
  */`

// ensure TS checks only once for each build
let hasTSChecked = false

const outputConfigs = {
    // each file name has the format: `dist/${name}.${format}.js`
    cjs: {
        file: pkg.main,
        format: `cjs`
    },
    global: {
        file: `dist/${name}.global.js`,
        format: `iife`
    },
    'esm-bundler': {
        file: `dist/${name}.esm-bundler.js`,
        format: `es`
    },
    'esm-browser': {
        file: `dist/${name}.esm-browser.js`,
        format: `es`
    }
}

const packageFormats = Object.keys(outputConfigs)
const packageConfigs = packageFormats.map(format =>
    createConfig(format, outputConfigs[format])
)

// only add the production ready if we are bundling the options
packageFormats.forEach(format => {
    if (format === 'cjs') {
        packageConfigs.push(createProductionConfig(format))
    }
})
console.log(packageConfigs)
export default packageConfigs

function createConfig(format, output, plugins = []) {
    if (!output) {
        console.log(require('chalk').yellow(`invalid format: "${format}"`))
        process.exit(1)
    }

    output.sourcemap = false
    output.banner = banner
    output.externalLiveBindings = false
    output.globals = {
        vue: 'Vue'
    }

    const isProductionBuild = /\.prod\.js$/.test(output.file)
    const isGlobalBuild = format === 'global'
    const isRawESMBuild = format === 'esm'
    const isNodeBuild = format === 'cjs'
    const isBundlerESMBuild = /esm-bundler/.test(format)

    if (isGlobalBuild) {
        output.name = 'VueNextI18n'
    }

    const shouldEmitDeclarations = !hasTSChecked

    const tsPlugin = ts({
        check: !hasTSChecked,
        tsconfig: path.resolve(__dirname, 'tsconfig.json'),
        cacheRoot: path.resolve(__dirname, 'node_modules/.rts2_cache'),
        tsconfigOverride: {
            compilerOptions: {
                sourceMap: output.sourcemap,
                declaration: shouldEmitDeclarations,
                declarationMap: shouldEmitDeclarations
            },
            exclude: ['__tests__', 'test-dts']
        }
    })
    // we only need to check TS and generate declarations once for each build.
    // it also seems to run into weird issues when checking multiple times
    // during a single build.
    hasTSChecked = true

    const external = ['vue']

    const nodePlugins = [resolve(), commonjs()]

    return {
        input: `src/index.ts`,
        // Global and Browser ESM builds inlines everything so that they can be
        // used alone.
        external,
        plugins: [
            tsPlugin,
            createReplacePlugin(
                isProductionBuild,
                isBundlerESMBuild,
                isGlobalBuild || isRawESMBuild || isBundlerESMBuild,
                isGlobalBuild,
                isNodeBuild
            ),
            ...nodePlugins,
            ...plugins
        ],
        output
    }
}

function createReplacePlugin(
    isProduction,
    isBundlerESMBuild,
    isBrowserBuild,
    isGlobalBuild,
    isNodeBuild
) {
    const replacements = {
        __COMMIT__: `"${process.env.COMMIT}"`,
        __VERSION__: `"${pkg.version}"`,
        __DEV__: isBundlerESMBuild
            ? // preserve to be handled by bundlers
              `(process.env.NODE_ENV !== 'production')`
            : // hard coded dev/prod builds
              !isProduction,
        // this is only used during tests
        __TEST__: isBundlerESMBuild
            ? `(process.env.NODE_ENV === 'test')`
            : false,
        // If the build is expected to run directly in the browser (global / esm builds)
        __BROWSER__: isBrowserBuild,
        __FEATURE_PROD_DEVTOOLS__: isBundlerESMBuild
            ? `__VUE_PROD_DEVTOOLS__`
            : false,
        __BUNDLER__: isBundlerESMBuild,
        __GLOBAL__: isGlobalBuild,
        __NODE_JS__: isNodeBuild
    }

    Object.keys(replacements).forEach(key => {
        if (key in process.env) {
            replacements[key] = process.env[key]
        }
    })
    return replace(replacements)
}

function createProductionConfig(format) {
    return createConfig(format, {
        file: `dist/${name}.${format}.prod.js`,
        format: outputConfigs[format].format
    })
}
