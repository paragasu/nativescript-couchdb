export interface Data {
    _id: string;
    _rev?: string;
    [x: string]: any;
}
export interface QueryParams {
    startkey?: string;
    endkey?: string;
    start_key?: string;
    end_key?: string;
    limit?: number;
    conflicts?: boolean;
    descending?: boolean;
    endkey_docid?: string;
    end_key_doc_id?: string;
    startkey_docid?: string;
    start_key_doc_id?: string;
    include_docs?: boolean;
    inclusive_end?: boolean;
    key?: string;
    keys?: string[];
    skip?: number;
    stale?: string;
    update_req?: boolean;
}
export declare class CouchDB {
    private host;
    private headers;
    constructor(databaseHost: string, extraHeaders: object | null);
    get(id: string): Promise<{}>;
    put(data: Data): Promise<{}>;
    remove(data: Data): Promise<{}>;
    private buildRequestParams(data);
    allDocs(data: QueryParams): Promise<{}>;
    query(designView: any, options: any): Promise<{}>;
}
