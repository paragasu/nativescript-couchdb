export interface Data {
    _id: string;
    _rev?: string;
    updatedAt: string;
    updatedBy: string;
    createdAt: string;
    createdBy: string;
}
export interface QueryParams {
    startkey?: string;
    endkey?: string;
    start_key?: string;
    end_key?: string;
    limit?: number;
}
export declare class CouchDB {
    private host;
    constructor(databaseHost: string);
    get(id: string): Promise<{}>;
    put(data: Data): Promise<{}>;
    remove(data: Data): Promise<{}>;
    private buildRequestParams(data);
    allDocs(data: QueryParams): Promise<{}>;
}
