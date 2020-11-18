export class Result {
    private ret!: number;
    private data!: Object | null;
    private error!: string | null;

    public getRet() {
        return this.ret;
    }

    public setRet(data: number): Result {
        this.ret = data;
        return this;
    }

    public getData() {
        return this.data;
    }

    public setData(data: any): Result {
        this.data = data;
        return this;
    }

    public getError() {
        return this.error;
    }

    public setError(error: any): Result {
        this.error = error;
        return this;
    }
}