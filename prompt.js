//Trying package

const inquirer = require('inquirer');
const qr = require('qr-image');
const fs = require('fs');

inquirer
    .prompt([
        {
        message: 'Enter any website URL to create QR code: ',
        name: 'URL',
        },
    ])

    .then(answers =>{
        const url = answers.URL
        const qr_svg = qr.image(url);
        qr_svg.pipe(fs.createWriteStream('qrCode.png'));
        console.log('QR Code has been generated!');
    })

    .catch(err => {
        console.log(err)
    })