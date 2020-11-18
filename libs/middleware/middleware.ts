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