//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {
  if(error){
    return console.log(`unable to connect to Mongo DB Server`);
  }
  console.log('Connected to MongoDB Server');
  const db = client.db('TodoApp');

  // db.collection('Todos').find({_id: new ObjectID('5b4564d927116ae7eec32083')}).toArray().then((docs)=>{
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined,2));
  // },(err)=>{
  //   console.log(err);
  // });
  // db.collection('Todos').find().count().then((count)=>{
  //   console.log('Todos' + count);
  //
  // },(err)=>{
  //   console.log(err);
  // });
  db.collection('Users').find({name: 'Rahul Bareja'}).toArray().then((docs)=>{
    console.log('Users');
    console.log(JSON.stringify(docs, undefined, 2));
  },(err)=>{
    console.log(err);
  });
  //client.close();
});
