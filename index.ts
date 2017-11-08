import * as http from "http";

export interface Data {
  _id: string,
  _rev?: string,
  [x: string] : any
}

export interface QueryParams {
  startkey?: string,
  endkey?: string,
  start_key?: string,
  end_key?: string,
  limit?: number
  conflicts?: boolean,
  descending?: boolean, 
  endkey_docid?: string,
  end_key_doc_id?: string,
  startkey_docid?: string,
  start_key_doc_id?: string,
  include_docs?: boolean,
  inclusive_end?: boolean,
  key?: string,
  keys?: string[],
  skip?: number,
  stale?: string,
  update_req?: boolean
}

export class CouchDB {
  private host: string;
  private headers: object;

  public constructor(databaseHost: string, extraHeaders: object | null) {
    this.host = databaseHost;
    this.headers = Object.assign({
      "Content-Type": "application/json" 
    }, extraHeaders || {});
  }


  /**
   * @param string id
   * @return promise
   */
  public get(id: string) {
    let params = {
      url: [this.host, id].join("/"),
      method: "GET",
      headers: this.headers
    }
    return new Promise((resolve, reject) => {
      http.request(params).then(response => {
        if(response.statusCode === 200){
          resolve(response.content.toJSON());
        }else{
          reject(new Error(response.content));
        } 
      }, err => reject(new Error(err)))
    })
  }


  public put(data: Data) {
    let params = {
      url: [this.host, data._id].join("/"),
      method: "PUT",
      headers: this.headers,
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
      headers: this.headers,
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
      if(key === "keys"){
        let rows = data["keys"] || [];
        let keysValue = '[' + rows.map(x => '"' + x + '"') + ']';
        args.push("keys=" + encodeURI(keysValue));
      }else{
        let value = (hasQuote.indexOf(key) != -1) ? '"' + data[key] + '"' : data[key];
        let item = [key, encodeURI(value)].join("=");
        args.push(item);
      }
    })
    return "?" + args.join("&");
  }


  public allDocs(data: QueryParams) {
    let params = {
      url: [this.host, "_all_docs", this.buildRequestParams(data)].join("/"),
      method: "GET",
      headers: this.headers
    }
    return new Promise((resolve, reject) => {
      http.request(params).then(response => {
        if(response.statusCode === 200){
          resolve(response.content.toJSON());
        }else{
          reject(new Error(response.content));
        }
      }, err => reject(new Error(err)))
    })
  }


  /**
   * query design views
   * @param designView  /_design/user/_view/top_contributor -> user/top_contributor
   * @param options group_level (int), reduce (boolean)
   * @return promise
   */
  public query(designView, options) {
    let [design, view] = designView.split("/");  
    let params = {
      url: [this.host, "_design", design, "_view", view].join("/") + this.buildRequestParams(options),
      method: "GET",
      headers: this.headers
    }
    return new Promise((resolve, reject) => {
      http.request(params).then(response => {
        if(response.statusCode === 200){
          resolve(response.content.toJSON());
        }else{
          reject(new Error(response.content));
        }
      }, err => reject(new Error(err)))
    })
  } 
}
