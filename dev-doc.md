# Express + TypeScript.js 延申学习

### 1、搭建 express 项目

- 初始化项目

  `npm init`

- 添加依赖

  ```json
  // package.json
  
  "dependencies": {
      "@types/express":"~4.17.0",
      "express": "~4.17.1",
      "ts-node-dev": "^1.0.0-pre.40",
      "typescript": "~3.5.1"
  }
  ```

  > ts-node-dev：能在开发过程中自动重启项目

- 项目目录新建 app、 build 目录

- 初始化 typescript

  `tsc --init`

  修改 `outDir`  为 `"outDir": "./build/"`

  > 1、全局安装完 `typescript` 就可以使用 tsc 命令了，能够把 `ts` 文件编译为 `js` 文件
  >
  > 2、`tsc init` 生成 `tsconfig.json`  ，用于配置 `typescript` 编译

- 添加命令行

  ```json
  "tsc": "tsc",
  "dev": "ts-node-dev --respawn --transpileOnly ./app/app.ts",
  "prod": "tsc && supervisor ./build/app.js",
  "test": "echo \"Error: no test specified\" && exit 1"
  ```

- `npm install`

- 新建 app/app.ts

  ```typescript
  import express=require('express');
  const app:express.Application=express();
  app.get('/',function(req,res){
      res.send('Hello World!');
  });
  app.listen(8888,function(){
      console.log('Example app listening on port 8888!');
  })
  ```

- `npm run dev`

- 参考：https://blog.csdn.net/sunxiaoju/article/details/91491036

### 2、引入 Routing-controllers 

- 官网教程

  https://github.com/typestack/routing-controllers/blob/master/lang/chinese/READEME.md	

> Routing-controllers 主要是通过 **依赖注入** 的思路开发 controller

- 核心思路

  app.ts

  ```typescript
  import 'reflect-metadata';
  import { useExpressServer } from "routing-controllers";
  import { routeConfig } from './libs/route';
  
  const app: express.Application = express();
  useExpressServer(app, routeConfig); // 把controller、middleware 通过 routeConfig 加入 app 中
  ```

  /libs/route.ts

  > libs 一般存放应用所用到的一些库配置

  ```typescript
  import { RoutingControllersOptions } from 'routing-controllers';
  
  export const routeConfig: RoutingControllersOptions = {
      controllers: [process.cwd() + '/app/controllers/*.ts'],
  }
  ```

  `useExpressServer` 创建 app，能够把受影响的 controller、middleware 等加入 app 中

### 3、全局中间件

​	在 routeConfig 中加入中间件位置

​       /libs/route.ts

- ```typescript
  export const routeConfig: RoutingControllersOptions = {
      controllers: [process.cwd() + '/app/controllers/*.ts'],
      middlewares: [process.cwd() + '/libs/middleware/*.ts'],
      defaultErrorHandler: false, // **有自己的全局错误处理**
  }
  ```

  > /libs/middleware/middleware.ts

  ```typescript
  /**
   * 全局中间件处理
   */
  import { Middleware, ExpressMiddlewareInterface } from "routing-controllers";
  
  // 监听所有请求进入
  @Middleware({type : 'before'})
  export class HeaderMiddleware implements ExpressMiddlewareInterface {
      use(request: any, response: any, next: () => any): void {
          console.log("before middleware");
          next();
      }
  }
  
  // 监听所有请求返回
  @Middleware({type : 'after'})
  export class ResponseMiddleware implements ExpressMiddlewareInterface {
      use(request: any, response: any, next: () => any): void {
          console.log("after middleware");
          next();
      }
  }
  
  // 全局错误处理
  import { Middleware, ExpressErrorMiddlewareInterface } from "routing-controllers";
  
  @Middleware({ type: "after" })
  export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
      error(error: any, request: any, response: any, next: () => any) {
          response.status(500).json({
              ret: -1,
              msg: 'service error',
          })
      }
  
  }
  ```

  参考： https://github.com/typestack/routing-controllers/blob/master/lang/chinese/READEME.md#%E5%85%A8%E5%B1%80%E4%B8%AD%E9%97%B4%E4%BB%B6

		### 4、依赖注入 typedi

> 为什么要依赖注入？
>
> 当一个类中需要实例化另一个类时，需要使用 new 语句创建，若被创建的类的 构造函数 发生改变，那么 new 语句的内容也要一起跟着改，当整个程序中存在大量 new 语句时，一个一个去修改是很麻烦的。

typedi 官网文档：https://docs.typestack.community/typedi/v/develop/