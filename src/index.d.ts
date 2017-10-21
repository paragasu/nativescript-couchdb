declare module "nativescript-couchdb" {
  export class Couchdb {
    constructor(databaseHost: string);
    get(id: string);
    put(data: Object);
    remove(data: Object);
  }
}
