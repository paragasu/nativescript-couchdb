# nativescript-couchdb
nativescript plugin for couchdb

# Install
```
tns install nativescript-couchdb
```

# Usage

```typescript

import * as dialog from "ui/dialogs";
import { CouchDB } from "nativescript-couchdb";

let db = new CouchDB("https://couchdb.server/dbname");
let data = {
  \_id: "hello",
  name: "world" 
}

// create and update
db.put(data)
  .then(res => dialog.alert("saved"))
  .catch(err => dialog.alert("Failed"))


// delete doc
db.remove(data)
  .then(res => dialog.alert("Data deleted"))
  .then(err => dialog.alert("Delete failed"))

```
