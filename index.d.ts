export declare class CouchDB {
    private host;
    constructor(databaseHost: string);
    get(id: string): Promise<{}>;
    put(data: Object): Promise<{}>;
    remove(data: Object): Promise<{}>;
    private buildRequestParams(data);
    allDocs(data: Object): void;
}
