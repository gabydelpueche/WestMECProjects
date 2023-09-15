const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const port =  process.env.PORT || 3000;
let contacts = require('./data/contacts.json');

app.use(express.json());
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}));

app.set("view engine", "ejs");
app.set("views", "./views");
app.set('public', './public')

app.get('/', (req, res) => {
    const data = fs.readFileSync('./data/contacts.json');
    contacts = JSON.parse(data);
    res.render('index', { updated: contacts });
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.get('/delete/:name', (req, res) => {
    const conName = req.params.name;
    const newContacts = contacts.filter(c => c.name !== conName);
    const jsonString = JSON.stringify(newContacts);
    fs.writeFileSync('./data/contacts.json', jsonString, 'utf-8', (err) => {throw err});
    res.redirect('/');
});

app.get('/edit/:name', (req, res) => {
    const conName = req.params.name;
    const edited = contacts.find(c => c.name == conName)
    res.render('edit', {edited});
});

app.get('/view/:name', (req, res) => {
    const conName = req.params.name;
    const view = contacts.find(c => c.name == conName)
    res.render('view', {view});
})

app.post('/addContact', (req, res) => {
    const data = fs.readFileSync('./data/contacts.json');
    const JSONdata = JSON.parse(data);
    JSONdata.push({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
    });
    const jsonString = JSON.stringify(JSONdata);
    fs.writeFileSync('./data/contacts.json', jsonString, 'utf-8', (err) => {throw err});
    res.redirect('/');
});

app.post('/edit/:name', (req, res) => {
    const conName = req.params.name;
    const edited = contacts.find(c => c.name == conName)
    if(edited){
        edited.name = req.body.name
        edited.phone =  req.body.phone
        edited.email = req.body.email
    };
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Listening at port ${port}`)
});