const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port =  process.env.PORT || 3000;
const user = require('./model/user');

mongoose.connect('mongodb+srv://gdelpu720:34768ppgX22334*@cluster0.g7epr1c.mongodb.net/UserRegistration')
    .then( () => {
        console.log('Connected');
    })
    .catch( err => {
        console.error(err)
    });

app.set('view engine', 'ejs');
app.set('views', './views');
app.set('public', './public')

app.use(express.urlencoded({extended: true}));

app.get('/', async (req, res) =>{
    const users = await user.find();
    res.render('register', {users});
});

app.get('/signIn', async (req, res) =>{
    res.render('signIn');
});

app.get('/update', async (req,res) =>{
    res.render('update');
});

app.get('/delete/:id', async (req, res)=> {
    const users = await user.findById(req.params.id);
    res.render('delete', {users});
});

app.get('/landing/:id', async (req, res)=> {
    const users = await user.findById(req.params.id);
    res.render('landing', {users});
});

app.post('/addUser', async (req, res) =>{
    const add = new user({
        fname: req.body.fname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
    await add.save();
    res.status(200).redirect(`/landing/${add._id}`);
});

app.post('/signIn', async (req, res) =>{
    const users = await user.find({ username: req.body.username })
    const id = users[0]._id.toString();
    res.redirect(`/landing/${id}`);
});

app.post('/update', async (req, res) =>{
    await user.findOneAndUpdate({username: req.body.username}, {password: req.body.password}, {new:true});
    res.status(200).redirect(`/landing/${user._id}`);
});

app.post('/delete/:id', async (req, res) =>{
    await user.findByIdAndDelete(req.params.id, {password: req.body.password});
    res.status(200).send('Account Deleted');
});

app.listen(port, () => {
    console.log('listening');
})