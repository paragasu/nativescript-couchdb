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
          reject(reponse);
        }
      }, err => reject(err));
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
          reject(response);
        }
      }, err => reject(err));
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
          reject(response);
        }
      }, err => reject(err));
    })
  }
}
