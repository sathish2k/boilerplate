let Mongoose = require('mongoose');
Mongoose.Promise = require('bluebird');
let options = {
    useMongoClient: true,
    autoIndex: false, 
    reconnectTries: Number.MAX_VALUE, 
    reconnectInterval: 500, 
    poolSize: 10, 
    bufferMaxEntries: 0
  };
  let uri = 'mongodb://localhost/seiyal'
  let db = Mongoose.connect(uri, options).then(
    () => { console.log('connection established') },
    err => { console.log('db error') }
  );
  exports.db = db;