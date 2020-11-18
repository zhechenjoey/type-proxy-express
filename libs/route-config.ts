import { RoutingControllersOptions } from 'routing-controllers';

export const routeConfig: RoutingControllersOptions = {
    controllers: [process.cwd() + '/app/controllers/*.ts'],
    middlewares: [process.cwd() + '/libs/middleware/*.ts'],
    defaultErrorHandler: false, //使用自定义全局错误处理函数
}