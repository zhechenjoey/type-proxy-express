import { Result } from './result';

export class ResultManage {
    public success(data?:any):any {
        // 类实例化后返回一个对象，属性即为类的成员（不包括函数）
        return new Result()
        .setRet(1)
        .setData(data)
        .setError(null);
    }

    public fail(error?:any):any {
        return new Result()
        .setRet(-1)
        .setData(null)
        .setError(error);
    }
}