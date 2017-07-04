//packages

const express = require('express');
const app = express();
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const models = require('./models/')

// engines and sets

app.engine('mustache', mustache());
app.set('views', './views');
app.set('view engine', 'mustache');

// validators, body parser, and server listing

app.use(expressValidator());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(3000 , function (){
  console.log('THE SERVER IS UP AND RUNNING!')
});

// empty arrays to push info into

// get info from input


app.get('/', function (request, response) {
  let incomplete= []
  let complete = []

  models.todolist.findAll({order: [['createdAt', 'DESC']]})
  .then(function(todos){
    console.log(todos)
    for(let i=0; i<todos.length; i++){
      if(todos[i].complete === true){
        complete.push(todos[i])
      }else{
        incomplete.push(todos[i])
      }
    }
  })
  .then(function(){
    response.render('index', {
      pageTitle: 'To Do List',
      incomplete: incomplete,
      complete: complete
    })
  })
});

// post info into the to do list
app.post('/', function (request, response) {
  let title = request.body.todos
  models.todolist.create({task:title, complete:false})
  response.redirect('/')
});

// complete info and push into new list
app.post('/completed', function (request, response) {
  const remove = request.body.completed
  todos.splice(todos.indexOf(remove), 1)
  complete.push(remove)
  response.redirect('/')
});
