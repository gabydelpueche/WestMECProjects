const inquirer = require('inquirer');
const qr = require('qr-image');
const fs = require('fs');

inquirer
  .prompt([
    {
        message: 'Enter any webiste URL to create a a QR code: ',
        name: 'URL',
    },
  ])
  .then((answers) => {
    const url = answers.URL;
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream('qr_img.png'));

    fs.writeFile('URL.txt', url, (err) => {
        if(err){throw err};
        console.log('The file has been saved');
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });