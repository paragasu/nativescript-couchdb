declare module "nativescript-couchdb" {
  export class CouchDB {
    constructor(databaseHost: string);
    get(id: string);
    put(data: Object);
    remove(data: Object);
  }
}
