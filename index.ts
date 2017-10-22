import * as http from "http";

export class CouchDB {
  private host: string;

  public constructor(databaseHost: string) {
    this.host = databaseHost;
  }

  public get(id: string) {
    return new Promise((resolve, reject) => {
      let url = [this.host, id].join("/");
      http.getJSON(url).then(response => {
        if(response.statusCode === 200){
          resolve(response.content.toJSON());    
        }else{
          reject(new Error(reponse));
        }
      }, err => reject(new Error(err)));
    })
  }


  public put(data: Object) {
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
          reject(new Error(response));
        }
      }, err => reject(new Error(err)));
    })
  }


  public remove(data: Object) {
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
          reject(new Error(response));
        }
      }, err => reject(new Error(err)));
    })
  }


  private buildRequestParams(data: Object) {
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


  public allDocs(data: Object) {
    return new Promise((resolve, reject) => {
      let url = [this.host, "_all_docs", this.buildRequestParams(data)].join("/");
      http.getJSON(url).then(response => {
        if(response.statusCode === 200){
          resolve(response.content.toJSON());    
        }else{
          reject(new Error(response));
        }
      }, err => reject(new Error(err)));
    })
  }
}
