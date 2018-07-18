const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');
const {User} = require('./../server/models/users');
const {ObjectId} = require('mongodb');

var id = '5b4b6e6ad77b761b4c7d9471';
if(!ObjectId.isValid(id)){
  console.log('ID not valid');
return;
}
// Todo.find({
//   _id: id
// }).then((todos)=>{
//   console.log(todos);
// },(e)=>{
//   console.log(e);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todos)=>{
//   console.log(todos);
// },(e)=>{
//   console.log(e);
// });

Todo.findById(id).then((todo)=>{
  if(!todo){
    console.log('Id not valid');
    return;
  }
  console.log(todo);
}).catch((e)=>console.log(e));

User.findById(id).then((user)=>{
  if(!user){
    console.log('User not found');
  }
  console.log(user);
}).catch((e)=>console.log(error));
