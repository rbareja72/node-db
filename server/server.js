require('./config/config');
const bodyParser = require('body-parser');
const express = require('express');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todos');
const {User} = require('./models/users');
const {authenticate} = require('./middleware/authenticate');
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

app.get('/todos', (req,res)=>{
  Todo.find().then((todos)=>{
    res.send({todos});
  },(e)=>{
    console.log(e);
    res.status(400).send(e);
  });
});

app.get('/todos/:id',(req, res)=>{
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Todo.findById(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e)=>{
    res.status(400).send();
  });
});

app.delete('/todos/:id',(req, res)=>{
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then((result)=>{
    if(!result){
      return res.status(404).send();
    }
    res.status(200).send(result);
  }).catch((e)=>{
    res.status(400).send();
  });
});

app.patch('/todos/:id',(req,res)=>{
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);
  if(!ObjectID.isValid(id)){
    console.log('Id not valid');
  }
  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }
  Todo.findByIdAndUpdate(id,{$set: body}, {new: true}).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send(todo);
  }).catch((e)=>{
    res.status(400).send();
  });
});

app.post('/users',(req, res)=>{
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);
  user.save().then(()=>{
    return user.generateAuthToken();
  }).then((token)=>{
    res.header('x-auth', token).send(user);
  }).catch((e)=>{
    res.status(400).send(e);
  });
});

app.post('/users/login',(req,res)=>{
  var body = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(body.email, body.password).then((user)=>{
    return user.generateAuthToken().then((token)=>{
      res.header('x-auth',token).send(user);
    });
    res.send(user);
  }).catch((e)=>{
    res.status(400).send();
  });
});

app.get('/users/me',authenticate,(req, res)=>{
  res.send(req.user);
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
