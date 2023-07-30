import{_ as s,o as a,c as n,O as l}from"./chunks/framework.8c03252b.js";const F=JSON.parse('{"title":"🌈 Getting started","description":"","frontmatter":{},"headers":[],"relativePath":"guide/index.md","filePath":"guide/index.md"}'),p={name:"guide/index.md"},e=l(`<h1 id="🌈-getting-started" tabindex="-1">🌈 Getting started <a class="header-anchor" href="#🌈-getting-started" aria-label="Permalink to &quot;🌈 Getting started&quot;">​</a></h1><p>To begin, you&#39;ll need to install vue-next-i18n</p><h2 id="use-npm" tabindex="-1">use npm <a class="header-anchor" href="#use-npm" aria-label="Permalink to &quot;use npm&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">npm install vue-next-i18n</span></span></code></pre></div><h2 id="use-yarn" tabindex="-1">use yarn <a class="header-anchor" href="#use-yarn" aria-label="Permalink to &quot;use yarn&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">yarn add vue-next-i18n</span></span></code></pre></div><h1 id="🚀-usage" tabindex="-1">🚀 Usage <a class="header-anchor" href="#🚀-usage" aria-label="Permalink to &quot;🚀 Usage&quot;">​</a></h1><p>When using with a module system, you must explicitly install the vue-next-i18n via app.use():</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 1. Ready translated locale messages</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// The structure of the locale message is the hierarchical object structure with each locale as the top property</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> messages </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">en</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">message</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">hello</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">hello world</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">zhCHS</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">message</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">hello</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">你好 世界</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">ja</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">message</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">hello</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">こんにちは、世界</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 2. Create i18n instance with options</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">createApp</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">createI18n</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue-next-i18n</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> i18n </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createI18n</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">locale</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">zhCHS</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// set locale, depend on messages object structure keys</span></span>
<span class="line"><span style="color:#A6ACCD;">  messages</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// set locale messages</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">localeKeys</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">[</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">zhCHS</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">zhCHT</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">en</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">] </span><span style="color:#676E95;font-style:italic;">//Not required, default value： [&#39;zhCHS&#39;,&#39;zhCHT&#39;,&#39;en&#39;]</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 3. Create a vue root instance</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> app </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createApp</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// set something options</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// ...</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 4. Install i18n instance to make the whole app i18n-aware</span></span>
<span class="line"><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">use</span><span style="color:#A6ACCD;">(i18n)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 5. Mount</span></span>
<span class="line"><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">mount</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">#app</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// Now the app has started!</span></span></code></pre></div><h2 id="html" tabindex="-1">HTML <a class="header-anchor" href="#html" aria-label="Permalink to &quot;HTML&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;div id=&quot;app&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;p&gt;{{ $t(&quot;message.hello&quot;) }}&lt;/p&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/div&gt;</span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!-- Output the following: --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;div id=&quot;#app&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;p&gt;你好 世界&lt;/p&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/div&gt;</span></span></code></pre></div><h1 id="🚌-composition-api" tabindex="-1">🚌 Composition API <a class="header-anchor" href="#🚌-composition-api" aria-label="Permalink to &quot;🚌 Composition API&quot;">​</a></h1><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">useI18n</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue-next-i18n</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">setup</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i18n</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">useI18n</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">currentLocale</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">changeLocale</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i18n</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">currentLocale</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">changeLocale</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h1 id="📦-api-examples" tabindex="-1">📦 API Examples <a class="header-anchor" href="#📦-api-examples" aria-label="Permalink to &quot;📦 API Examples&quot;">​</a></h1><h2 id="basic" tabindex="-1">basic <a class="header-anchor" href="#basic" aria-label="Permalink to &quot;basic&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">const messages = {</span></span>
<span class="line"><span style="color:#A6ACCD;">  en: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    message: {</span></span>
<span class="line"><span style="color:#A6ACCD;">      hello: &#39;hello world&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  zhCHS: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    message: {</span></span>
<span class="line"><span style="color:#A6ACCD;">      hello: &#39;你好 世界&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  ja: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    message: {</span></span>
<span class="line"><span style="color:#A6ACCD;">      hello: &#39;こんにちは、世界&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;div id=&quot;app&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;p&gt;{{ $t(&quot;message.hello&quot;) }}&lt;/p&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/div&gt;</span></span></code></pre></div><h2 id="support-function" tabindex="-1">support function <a class="header-anchor" href="#support-function" aria-label="Permalink to &quot;support function&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">const messages = {</span></span>
<span class="line"><span style="color:#A6ACCD;">  en: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    message: {</span></span>
<span class="line"><span style="color:#A6ACCD;">      hello: (val) =&gt;  \`hello world \${val}\`</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  zhCHS: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    message: {</span></span>
<span class="line"><span style="color:#A6ACCD;">      hello: (val) =&gt;  \`你好 世界 \${val}\`</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  ja: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    message: {</span></span>
<span class="line"><span style="color:#A6ACCD;">      hello: (val) =&gt;  \`こんにちは、世界 \${val}\`</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;div id=&quot;app&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;p&gt;{{ $t(&quot;message.hello&quot;,&#39;hahaha&#39;) }}&lt;/p&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/div&gt;</span></span></code></pre></div><h2 id="support-n-replacement" tabindex="-1">support $n replacement <a class="header-anchor" href="#support-n-replacement" aria-label="Permalink to &quot;support $n replacement&quot;">​</a></h2><p>Inserts the n th (1-indexed) available</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">const messages = {</span></span>
<span class="line"><span style="color:#A6ACCD;">  en: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    message: {</span></span>
<span class="line"><span style="color:#A6ACCD;">      hello: \`hello world $1,$2,$3...\`</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  zhCHS: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    message: {</span></span>
<span class="line"><span style="color:#A6ACCD;">      hello: \`你好 世界 $1,$2,$3...\`</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  ja: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    message: {</span></span>
<span class="line"><span style="color:#A6ACCD;">      hello:\`こんにちは、世界 $1,$2,$3...\`</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// output: hello world param1,param2,param3</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;div id=&quot;app&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;p&gt;{{ $t(&quot;message.hello&quot;,&#39;param1&#39;,&#39;param2&#39;,&#39;param3&#39;) }}&lt;/p&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/div&gt;</span></span></code></pre></div><h2 id="use-array-messages" tabindex="-1">use array messages <a class="header-anchor" href="#use-array-messages" aria-label="Permalink to &quot;use array messages&quot;">​</a></h2><p>The array order depends on the localeKeys, default value is [&#39;zhCHS&#39;,&#39;zhCHT&#39;,&#39;en&#39;]</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// example localeKeys: [&#39;zhCHS&#39;,&#39;en&#39;,&#39;ja&#39;]</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;div id=&quot;app&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;p&gt;{{ $t([&#39;你好 世界&#39;,&#39;hello world&#39;,&#39;こんにちは、世界&#39;]) }}&lt;/p&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/div&gt;</span></span></code></pre></div><h2 id="use-i18n-option-in-component" tabindex="-1">use i18n option in component <a class="header-anchor" href="#use-i18n-option-in-component" aria-label="Permalink to &quot;use i18n option in component&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">export default {</span></span>
<span class="line"><span style="color:#A6ACCD;">  i18n:{</span></span>
<span class="line"><span style="color:#A6ACCD;">    en: {</span></span>
<span class="line"><span style="color:#A6ACCD;">      message: {</span></span>
<span class="line"><span style="color:#A6ACCD;">        hello: &#39;hello world&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">    zhCHS: {</span></span>
<span class="line"><span style="color:#A6ACCD;">      message: {</span></span>
<span class="line"><span style="color:#A6ACCD;">        hello: &#39;你好 世界&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">    ja: {</span></span>
<span class="line"><span style="color:#A6ACCD;">      message: {</span></span>
<span class="line"><span style="color:#A6ACCD;">        hello: &#39;こんにちは、世界&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    } </span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  setup(){</span></span>
<span class="line"><span style="color:#A6ACCD;">    // code...</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;div id=&quot;app&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;p&gt;{{ $t(&#39;message.hello&#39;) }}&lt;/p&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/div&gt;</span></span></code></pre></div>`,27),o=[e];function t(c,r,i,C,y,A){return a(),n("div",null,o)}const h=s(p,[["render",t]]);export{F as __pageData,h as default};
