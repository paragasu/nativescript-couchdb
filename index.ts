import * as http from "http";

export class CouchDB {
  private host: string;

  public constructor(databaseHost: string) {
    this.host = databaseHost;
  }

  public get(id: string) {
    return new Promise((resolve, reject) => {
      http.getJSON([this.host, id].join("/")).then(resolve, reject);
    })
  }

  public put(data: Object) {
    let host = [this.host, data._id].join("/");
    return new Promise((resolve, reject) => {
      http.request({
        url: host,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify(data)   
      }).then(resolve, reject);
    })
  }

  public remove(data: Object) {
    let host = [this.host, data._id].join("/");
    return new Promise((resolve, reject) => {
      http.request({
        url: host,
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify(data)   
      }).then(resolve, reject);
    })
  }
}
