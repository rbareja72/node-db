const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {
  if(error){
    return console.log(`unable to connect to Mongo DB Server`);
  }
  console.log('Connected to MongoDB Server');
  const db = client.db('TodoApp');
  //delete many
  // db.collection('Users').deleteMany({name: 'Rahul Bareja'}).then((result)=>{
  //   console.log(result);
  // });
  //deleteOne
  // db.collection('Users').deleteOne({name: 'Rahul Bareja'}).then((result)=>{
  //   console.log(result);
  // });
  //findOneAndDelete
  // db.collection('Users').findOneAndDelete({name: 'Rahul Bareja'}).then((result)=>{
  //   console.log(result);
  // });
  client.close();
});
