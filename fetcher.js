const request = require('request');
const fs = require('fs');
const address = process.argv.slice(2);
request(address[0], (error, response, body) => {
  if(error){
    console.log('error:', error); // Print the error if one occurred
  } else {
    //check if the file already exists in the directory
    fs.access(address[1], fs.F_OK, (noErr) => {
      if(noErr){
        //if not file not found, create the file
        fs.writeFile(address[1], body, function (err) {
          if (err){
            console.log('No such file or directory')
          } else {
            console.log(`Downloaded and saved to ${address[1]}`);
          }
        });
      } else{
        //if file found...
        console.error(`File ${address[1]} already exists`);
      } 
    });
  }
});
