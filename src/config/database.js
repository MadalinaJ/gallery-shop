// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;

// let _db;
// //mongo creates the shop db as soon as we start writing in it
// const mongoConnect = callback => {
//   MongoClient.connect(
//     'mongodb+srv://mads3:enTer7tiMeS@mjshop-d5pjj.mongodb.net/shop?retryWrites=true&w=majority'
//   )
//     .then(client => {
//       console.log('Connected!');
//       _db = client.db();
//       callback();
//     })
//     .catch(err => {
//       console.log(err);
//       throw err;
//     });
// };

// const getDb = () => {
//   if (_db) {
//     return _db;
//   }
//   throw 'No database found!';
// };



//----------------------------------------------------------------
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://mads3:<password>@mjshop-d5pjj.mongodb.net/shop?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("shop").collection("products");
//   // perform actions on the collection object
//   client.close();
// });

//exports.mongoConnect = mongoConnect;
//exports.getDb = getDb;
