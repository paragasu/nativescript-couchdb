import * as http from "http";

export class CouchDb {
  private host: string;

  public constructor(databaseHost: string) {
    this.host = databaseHost;
  }

  public get(id: string) {
    let url = this.host + "/" + id;
    return http.getJSON(params);
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
