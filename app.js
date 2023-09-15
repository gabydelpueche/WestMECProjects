const express = require('express');
const multer  = require('multer');
const port =  process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.set("view engine", "ejs");
app.set("views", "./views");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname);
    },
  });

const upload = multer({storage});

app.get('/', (req, res) =>{
    res.render('upload');
});

app.get()

app.post('/upload', upload.single('file'), (req, res) =>{
    if(!req.file){
        return res.status(400).send('File was not uploaded');
    };
    const buffer = 
    res.status(200).send('File was succesfully uploaded');
});

app.listen(port, () =>{
    console.log(`Server listening at port ${port}`);
});