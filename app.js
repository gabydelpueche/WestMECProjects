const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port =  process.env.PORT || 3000;
const movies = require("./data/movie.json");

app.use(express.json());
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}));

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
    res.render("index", {movies});
});

app.post('/sort', (req, res) =>{
    const display = req.body.movie;
    const movie = movies.filter(movie => movie.title == display)[0];
    console.log(movie);
    res.render('display', {movie});
})

// app.post('/sort', (req, res) =>{
//     console.log(req.body.listed_in)
//     const match = movies.listed_in
//     const movie = movies.filter(x =>{
//         x.value == match
//         console.log(x.value)
//     })
// });

app.all("*", (req, res) => {
    res.status(404).send("404 Not Found");
}); 

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});