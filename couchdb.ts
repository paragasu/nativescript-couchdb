import * as http from "http";

export class CouchDb {
  private host: string;

  public constructor(databaseHost: string) {
    this.host = databaseHost;
  }

  public get(id: string) {
    return http.getJSON([this.host, id].join("/"));
  }

  public put(data: Object) {
    let host = this.host;
    return http.request({
      url: host,
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      content: JSON.stringify(data)   
    })
  }

  public remove(data: Object) {
    let host = this.host;
    return http.request({
      url: host,
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      content: JSON.stringify(data)   
    })
  }
}
