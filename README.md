## 云生活超市管理系统（完整的后台管理系统）
React后台项目：react + react-router4 + redux + antd + axios + sass
##### (项目迭代滚动中，如果有喜欢这个的小哥哥小姐姐，送我一个start，谢谢！如果您有什么建议修改之类的，请疯狂的pull request or create issue.)

### 技术栈
1. react 16.2.0
2. react-router-dom 4.2.2 (react-router 4)
3. redux
4. ant-design
5. axios
6. sass
7. es6 + babel ( 配了babel-plugin-transform-decorator-legacy 装饰器)

使用了create-react-app搭建项目。 服务器端我是用springboot+mybatis编写的，仓库地址是：[服务器端代码](https://github.com/greyu/backend_cloud_commodity)

作者想说：其实是想用React-native做一个超市的app，取名云生活超市（名字很难听各位轻吐槽），既然有app，那就得有一个后台，就是这个了。附上app端仓库地址：[云生活app](https://github.com/greyu/community_e_commerce)

### 环境
* 我自己使用ubuntu16.04，建议在linux或者mac os系统下运行
* 因为项目依赖了sass，如果用windows，有一定的可能会出现很奇妙的问题哈

### 项目启动
1. ***首先你可以安装一下yarn，并使用taobao registry***
```bash
npm install -g yarn
yarn config set registry https://registry.npm.taobao.org --global
yarn config set disturl https://npm.taobao.org/dist --global
```
2. ***克隆项目并安装环境***
```bash
git clone https://github.com/greyu/cms_community_e_commerce.git
cd cms_community_e_commerce
yarn
```
3. ***直接运行***
```bash
npm start
```
5. ***服务器监听3000端口，直接访问 http://localhost:3000***

### 目录结构介绍
```js
### 目录结构介绍
***├── config                              // webpack配置文件***
***├── public                              ***
***├── dist                                ***
***├── node_modules                        // 项目的包依赖***
***├── src                                 // 源码目录***
***│   ├── assets                          // 存放项目的一些资源和SCSS文件***
***│   ├── components                      // 页面组件***
***│   ├── containers                      // 页面（容器） ***
***│   ├── constants                       // 项目全局配置***
***│   ├── services                        // 服务器端接口数据映射***
***│   ├── reducers                        // reducers***
***│   ├── actions                         // actions***
***│   ├── utils                           // 封装的一些常用工具 ***
***│   ├── Routes.js                       // 页面路由 ***
***│   ├── index.js                        // 程序入口文件，加载各种公共组件***
***├── .babelrc                            // babel配置文件 ***
```
### 使用说明
* 管理员默认账号：admin 密码：admin
