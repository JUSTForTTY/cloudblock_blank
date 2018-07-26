# 云积木angular前端项目
你的本地环境需要安装 node 和 git。我们的技术栈基于 Typescript、Angular、g2、@delon 和 ng-zorro-antd，提前了解和学习这些知识会非常有帮助。
# angular
建议去[angular](https://angular.io/)官网学习 版本是v5.2.7
# 基于ng-alain

基于 [Ng-zorro-antd](https://github.com/NG-ZORRO/ng-zorro-antd)的企业后台模板。


[DEMO](https://cipchk.github.io/ng-alain/)


### 创建antd项目

需要依赖于 `@delon/cli`，[如何安装？](http://ng-alain.com/docs/cli)
以下命令用来创建新项目
```bash
ng new -c=@delon/cli my-app
```

### 如何使用
直接 clone git 仓库

```bash
$ git clone https://codehub.devcloud.huaweicloud.com/23f8f13b648446f59c3e55a64d956b0a/cloudBlock.git

cd cloudBlock

# 安装依赖包
npm install

# 启动
ng server

# 使用HMR启动
ng serve --hmr -e=hmr
```

> [vscode] 建议安装 [ng-zorro-vscode](https://marketplace.visualstudio.com/items?itemName=cipchk.ng-zorro-vscode) 插件，含 `nz-alain-*` 代码片断。


## Links

+ [文档](http://ng-alain.com)
+ [github @delon](https://github.com/cipchk/delon)
+ [DEMO](https://cipchk.github.io/ng-alain/)
+ [组件NG-ZORRO](https://ng.ant.design/#/docs/angular/introduce)
## Delon

[delong](https://github.com/cipchk/delon) 是基于 Ant Design 设计理念的企业级中后台前端业务型组件库。

[![Build Status](https://travis-ci.org/cipchk/delon.svg?branch=master)](https://travis-ci.org/cipchk/delon)
[![Dependency Status](https://david-dm.org/cipchk/delon/status.svg)](https://david-dm.org/cipchk/delon)
[![DevDependency Status](https://david-dm.org/cipchk/delon/dev-status.svg)](https://david-dm.org/cipchk/delon?type=dev)

[![npm](https://img.shields.io/npm/l/@delon/theme.svg)](https://www.npmjs.com/package/@delon/theme)
[![npm](https://img.shields.io/npm/dm/@delon/theme.svg)](https://www.npmjs.com/package/@delon/theme)

| package name | version | next version |
| ------------ |:-----:|:----------:|
| @delon/theme | [![NPM version](https://img.shields.io/npm/v/@delon/theme.svg)](https://www.npmjs.com/package/@delon/theme) | [![NPM version](https://img.shields.io/npm/v/@delon/theme/next.svg)](https://www.npmjs.com/package/@delon/theme) |
| @delon/abc | [![NPM version](https://img.shields.io/npm/v/@delon/abc.svg)](https://www.npmjs.com/package/@delon/abc) | [![NPM version](https://img.shields.io/npm/v/@delon/abc/next.svg)](https://www.npmjs.com/package/@delon/abc) |
| @delon/acl | [![NPM version](https://img.shields.io/npm/v/@delon/acl.svg)](https://www.npmjs.com/package/@delon/acl) | [![NPM version](https://img.shields.io/npm/v/@delon/acl/next.svg)](https://www.npmjs.com/package/@delon/acl) |
| @delon/auth | [![NPM version](https://img.shields.io/npm/v/@delon/auth.svg)](https://www.npmjs.com/package/@delon/auth) | [![NPM version](https://img.shields.io/npm/v/@delon/auth/next.svg)](https://www.npmjs.com/package/@delon/auth) |
| @delon/mock | [![NPM version](https://img.shields.io/npm/v/@delon/mock.svg)](https://www.npmjs.com/package/@delon/mock) | [![NPM version](https://img.shields.io/npm/v/@delon/mock/next.svg)](https://www.npmjs.com/package/@delon/mock) |
| @delon/cache | [![NPM version](https://img.shields.io/npm/v/@delon/cache.svg)](https://www.npmjs.com/package/@delon/cache) | [![NPM version](https://img.shields.io/npm/v/@delon/cache/next.svg)](https://www.npmjs.com/package/@delon/cache) |
| @delon/cli | [![NPM version](https://img.shields.io/npm/v/@delon/cli.svg)](https://www.npmjs.com/package/@delon/cli) | [![NPM version](https://img.shields.io/npm/v/@delon/cli/next.svg)](https://www.npmjs.com/package/@delon/cli) |

## 特性

+ 基于 `ng-zorro-antd`
+ 响应式
+ 国际化
+ ACL访问控制
+ 延迟加载及良好的启用画面
+ 良好的UI路由设计
+ 十种颜色版本
+ Less预编译
+ 良好的目录组织结构
+ 简单升级
+ 模块热替换
+ 支持Docker部署
+ 支持[Electron](http://ng-alain.com/docs/cli#electron)打包（限cli构建快速web生成exe桌面应用程序）

