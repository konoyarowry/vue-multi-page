# 买买商城

## npm命令

``` bash
# 安装依赖
npm install

# 开发环境
npm run dev

# 生产环境构建
npm run build

# 查看构建的打包分析
npm run build --report
```

1. 页面目录 src/pages

2. 全局访问的第三方库声明在webpack.base.config.js

3. src/main.js作为所有页面的入口用来引入通用的库,执行通用函数

4. plugins放置需要挂载到Vue.prototype的方法,public放置全局访问的方法,shared放置其他的公共方法

5. 修复bug从prd分支拉新分支,合并到prd分支并删除源分支

6. 开发新功能/模块,从dev分支拉新分支,合并到dev分支

7. h5下的vue项目在jenkins构建时会覆盖旧页面,删除package.json下build后的node build/copy.js就不会拷贝并覆盖

8. Swiper用id初始化,防止页面多个swiper时出现bug

9. config/path.js在dev和prd是不同的,在.gitignore中忽略,staticPath控制了img的src图片路径,css中background的url路径,引入的js和css资源的路径
