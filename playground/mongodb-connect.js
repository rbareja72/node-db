const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {
  if(error){
    return console.log(`unable to connect to Mongo DB Server`);
  }
  console.log('Connected to MongoDB Server');
  const db = client.db('TodoApp');
  db.collection(`Users`).insertOne({
    name: 'Rahul Bareja',
    age: 23,
    location: 'Panipat'
  },(err, res)=>{
    if(err){
      return console.log('Error',err);
    }
    console.log(JSON.stringify(res.ops, undefined, 2));
  });
  client.close();
});
