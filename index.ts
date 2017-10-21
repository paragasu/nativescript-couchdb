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
    return http.request({
      url: this.host,
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      content: JSON.stringify(data)   
    }.bind(this))
  }

  public remove(data: Object) {
    return http.request({
      url: this.host,
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      content: JSON.stringify(data)   
    }.bind(this))
  }
}
