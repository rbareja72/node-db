const bodyParser = require('body-parser');
const express = require('express');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todos');
const {User} = require('./models/users');

var app = express();
app.use(bodyParser.json());
app.post('/todos', (req,res)=>{
  console.log(req.body);
  var todo = new Todo({text: req.body.text});
  todo.save().then((doc)=>{
    res.send(doc);
  },(e)=>{
    res.status(400).send(e);
  });
});

app.listen(3000, ()=>{
  console.log('listening on port 3000');
});
//
// var newTodo = new Todo({text: 'Eat Dinner'});
// newTodo.save().then((doc)=>{
//   console.log(doc);
// },(e)=>{
//   console.log(e);
// });
//
// var user = new User({email: 'rbareja72@gmail.com'});
// user.save().then((doc)=>{
//   console.log(doc);
// },(e)=>{
//   console.log(e);
// });
