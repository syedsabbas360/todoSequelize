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
app.use(bodyParser.urlencoded({
  extended: false
}));
app.listen(3000, function() {
  console.log('THE SERVER IS UP AND RUNNING!')
});

// empty arrays to push info into

// get info from input


app.get('/', function(request, response) {
  let incomplete = []
  let complete = []

  models.todolist.findAll({
      order: [
        ['createdAt', 'DESC']
      ]
    })
    .then(function(todos) {
      // console.log(todos)
      for (let i = 0; i < todos.length; i++) {
        if (todos[i].complete === false) {
          incomplete.push(todos[i])
        }else{
          complete.push(todos[i])
        }
      }
    })
    .then(function() {
      // console.log(incomplete)
      response.render('index', {
        pageTitle: 'To Do List',
        incomplete: incomplete,
        complete: complete
      })
    })
});

// post info into the to do list
app.post('/', function(request, response) {
  let title = request.body.todos
  models.todolist.create({
      task: title,
      complete: false,
    })
    .then(function() {
      response.redirect('/')
    })
});

//now write a conditional where when the user clicks 'mark complete' then check if the value is 'false'. If it is, change complete's value to TRUE - THEN destroy the task if it meets our conditional'
app.post('/completed', function(request, response) {

  models.todolist.update({
      complete: true
    }, {
      where: {
        id: request.body.completed
      }
    })
    .then(function() {
      return response.redirect('/')
    })
});

app.post('/delete', function(request, response) {
  models.todolist.destroy({
      where: {
        id: request.body.id
      }
    })
    .then(function() {
      return response.redirect('/')
    })
})
