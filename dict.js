const https = require('https');

function getDefintion(word){
    try{
        const req = https.get(
            //Key
            `https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=fe96ba0e-cf1f-4249-b74f-ab7224b880b4`,
            (response) =>{
                let body = '';
                //reads the data
                response.on('data', (data) =>{
                    body += data.toString();
                });
            
                response.on('end', () =>{
                    //parse data
                    const def = JSON.parse(body);
                    //print data
                    console.log(def[0].shortdef);
                });
            }
        );
        //display errors
        req.on('error', err =>{
            console.error(err.message)
        });
    //catch errors
    } catch (err){
        console.log(err.message);
    };
};

//process.argv extracts the user-provided arguments, excluding the first two elements
const query = process.argv.slice(2);
query.forEach(getDefintion)