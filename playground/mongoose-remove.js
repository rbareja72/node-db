const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');
const {User} = require('./../server/models/users');
const {ObjectId} = require('mongodb');

//Todo.remove
// Todo.remove({}).then((result)=>{
//   console.log(result);
// });

//Todo.findByIdAndRemove
Todo.findByIdAndRemove('5b4b5c6dced70607dc713773').then((result)=>{
  console.log(result);
});
