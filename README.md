# 多页Vue

1. 页面目录 src/pages

2. 使用npm run dev -- --devPages=shop/hot来指定dev环境要开发的页面,提高dev构建速度,多个页面用逗号隔开

3. 所有页面使用template.html作为模板,所有页面也都引入了src/main.js用来引入各种公共库

4. 全局访问的第三方库和项目自用公共库声明在webpack.base.config.js

5. plugins目录放置直接挂载到Vue原型上的函数及变量,变量名前带有$符号

6. public目录放置不挂载到Vue上的公共函数

7. 通过Vue.extend实现document.append式的Vue组件调用,查看components/dialog

8. 通过Vue的render函数根据接口返回的组件顺序渲染页面组件,查看pages/shop/hot
