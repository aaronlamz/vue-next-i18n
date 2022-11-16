#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm install
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME
git init
git branch -m master main
git config --global init.defaultBranch main
git config --global user.email "qylinxia@qq.com"
git config --global user.name "aaronlamz"
git add .
git commit -m 'deploy'
git status
git push -f git@github.com:aaronlamz/vue-next-i18n.git main:gh-pages
