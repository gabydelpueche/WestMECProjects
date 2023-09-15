const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
let tasks = [];

app.set('view engine', 'ejs');
app.set('views', './views');
app.set('public', './public')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}));

// HANDLES GET REQUESTS

app.get('/', (req, res) =>{
    res.render('index', {tasks});
});

app.get('/edit/:id', (req, res) =>{
    // extracts the task ID from the URL param
    const taskID = parseInt(req.params.id);
    // searches array for task with the same id as taskID
    const task = tasks.find(task => task.id === taskID);
    res.render('edit', {task});
});

app.get('/delete/:id', (req, res) =>{
    const taskID = parseInt(req.params.id);
    // keeps only task ID's that don't match taskID
    const tasks = tasks.filter(task => task.id !== taskID);
    res.redirect('/');
});


// HANDLES POST REQUESTS

app.post('/addTask', (req, res) =>{
    const newTask = req.body.task;
    tasks.push({id: Date.now(), text: newTask});
    console.log(tasks)
    res.redirect('/');
});

app.post('/edit/:id', (req, res) =>{
    const taskID = parseInt(req.params.id);
    const updatedText = req.body.task;
    const task = tasks.find(task => task.id === taskID);
    if(task){
        task.text = updatedText;
    };
    res.redirect('/');
})


app.listen(port, ()=>{
    console.log('server running')
});