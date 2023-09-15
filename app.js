const express = require('express');
const multer = require('multer');
const zlib = require('zlib');
const port =  process.env.PORT || 3000;
const app = express();
const fs = require('fs');

const storage = multer.memoryStorage();
const upload = multer({storage});

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "./views");

app.get('/', (req, res) =>{
    res.render('index');
});

app.post('/upload', upload.single('file'), (req, res) =>{
    if(!req.file){
        return res.status(400).send('File was not uploaded');
    };

    const buffer = req.file.buffer;
    const compressed = zlib.gzipSync(buffer);
    fs.writeFileSync(`./uploads/${req.file.originalname.split(".")[0]}.gz`, compressed)
    res.status(200).send('File was succesfully uploaded');
});

app.listen(port, () =>{
    console.log(`Server listening at port ${port}`);
});