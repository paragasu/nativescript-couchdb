# nativescript-couchdb
Nativescript plugin for couchdb
A simple wrapper using nativescript http api to implement subset api compatible with PouchDB.

# Install
```
tns plugin install nativescript-couchdb
```

# API

**constructor(couchdb\_url, extraHeaders)**
Setup the database to connect to
- url _string_ eg: https://localhost:5984
- extraHeaders _Map_ specify extra map to pass as http header

**put(doc)**
- doc _string_ valid couchdb json doc with \_id key
- return promise

**get(docId)**
- docId _string_ document id 
- return promise

**remove(doc)**
- doc _json object_ couchdb json db or json with \_id, \_rev key
- return promise

**allDocs(options)**
- options _json object_ couchdb params as in http://docs.couchdb.org/en/2.0.0/api/database/bulk-api.html 
- return promise

**query(design_view)**
- design\_view string eg /\_design/design\_name/\_view/view\_name will be _design\_name/view\_name_
- return promise


# Usage

```typescript

import * as dialog from "ui/dialogs";
import { CouchDB } from "nativescript-couchdb";

let db = new CouchDB("https://couchdb.server/dbname", {
  "Authorization": "Basic base64\_encoded\_string"
});
let data = {
  _id: "hello",
  name: "world" 
}


// create and update
db.put(data)
  .then(res => dialog.alert("saved"))
  .catch(err => dialog.alert("Failed"));

// get data
db.get("hello")
  .then(res => dialog.alert(JSON.stringify(res)))
  .catch(err => dialog.alert("Data not found));

// delete doc
db.remove(data)
  .then(res => dialog.alert("Data deleted"))
  .catch(err => dialog.alert("Delete failed"));

// alldocs
db.allDocs(options)
  .then(res => dialog.alert(res))
  .catch(err => dialog.alert(err));

// query views
db.query("user/top_contributor", { group_level: 1, reduce: true })
  .then(res => dialog.alert(res))
  .catch(err => dialog.alert(err));

```
