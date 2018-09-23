// const MongoClient 	= require('mongodb').MongoClient;

// var db, chain;
// MongoClient.connect(process.env.DB_URL, function(e, client) {
// 	if (e){
// 		console.log(e);
// 	}	else{
// 		db = client.db(process.env.DB_NAME);
// 		accounts = db.collection('accounts');
// 		console.log('mongo :: connected to database :: "'+process.env.DB_NAME+'"');
// 	}
// });
let mongoose = require("mongoose");

let BlockChainModel = require("./blockchainschema");

//Connect to DB
mongoose.connect("mongodb://localhost:27017/blockChain", (err) => {
    if (err)
        return console.log("Cannot connect to DB");
    console.log("Database is Connected");
    connectionCallback();
});

let connectionCallback = () => {};

module.exports.onConnect = (callback) => {
    connectionCallback = callback;
}