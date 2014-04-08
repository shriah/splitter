var Datastore = require('nedb')
    , db = new Datastore({ filename: __dirname+'/../db/pooler.db',autoload: true  });
module.exports = db;
