export declare class CouchDb {
    private host;
    constructor(databaseHost: string);
    get(id: string): any;
    put(data: Object): any;
    remove(data: Object): any;
}
