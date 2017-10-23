import * as http from "http";

export interface Data {
  _id: string,
  _rev?: string,
  updatedAt: string,
  updatedBy: string,
  createdAt: string,
  createdBy: string
}

export interface QueryParams {
  startkey?: string,
  endkey?: string,
  start_key?: string,
  end_key?: string,
  limit?: number
}

export class CouchDB {
  private host: string;

  public constructor(databaseHost: string) {
    this.host = databaseHost;
  }

  public get(id: string) {
    return new Promise((resolve, reject) => {
      let url = [this.host, id].join("/");
      http.getJSON(url).then(
        res => resolve(res), 
        err => reject(new Error(err))
      )
    })
  }


  public put(data: Data) {
    let params = {
      url: [this.host, data._id].join("/"),
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      content: JSON.stringify(data)   
    }
    return new Promise((resolve, reject) => {
      http.request(params).then(response => {
        if(response.statusCode === 201){
          resolve(response.content.toJSON());
        }else{
          reject(new Error(response.content));
        }
      }, err => reject(new Error(err)));
    })
  }


  public remove(data: Data) {
    let params = {
      url: [this.host, data._id].join("/"),
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      content: JSON.stringify(data)   
    }
    return new Promise((resolve, reject) => {
      http.request(params).then(response => {
        if(response.statusCode === 200){
          resolve(response.content.toJSON());
        }else{
          reject(new Error(response.content));
        }
      }, err => reject(new Error(err)));
    })
  }


  private buildRequestParams(data: QueryParams) {
    let keys = Object.keys(data);
    let hasQuote = ["startkey", "start_key", "endkey", "end_key"];
    let args: string[] = [];
    keys.forEach(key => {
      let value = (hasQuote.indexOf(key) != -1) ? '"' + data[key] + '"' : data[key];
      let item = [key, encodeURI(value)].join("=");
      args.push(item);
    })
    return "?" + args.join("&");
  }


  public allDocs(data: QueryParams) {
    return new Promise((resolve, reject) => {
      let url = [this.host, "_all_docs", this.buildRequestParams(data)].join("/");
      http.getJSON(url).then(
        res => resolve(res), 
        err => reject(new Error(err))
      )
    })
  }
}
