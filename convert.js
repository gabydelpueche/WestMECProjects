// Install npm by typing 'npm i markdown-it --save' in the terminal
// Include external modules form the 'markdown-it' npm
const MarkdownIt = require('markdown-it')

// Create variable 'fs' for using the file system module 
const fs = require('fs');

//Create variable 'md' using the new operator to create a USER DEFINED object type
let md = new MarkdownIt();

//Create a stream to read the md file that you created
const read = fs.createReadStream('mark.md')

//Use the .on() method to create a function that will read the file, render the file
//and then create a new file with the written out HTML 
read.on('data', chunk => {
    //This will render the file into a string
    const data = md.render(chunk.toString());

    //This creates a write stream in the HTML language 
    //Then, writes out the code onto the new file
    fs.createWriteStream('output.html').write(data);
});