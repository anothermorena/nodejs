/* 
    dir in the filenanme stands for directory.
*/

const fs = require('fs');

//check if a directory exists before creating it to prevent overriding it
if (!fs.existsSync('./new')) {
  //create or make a directory called new only if it does not exist
  fs.mkdir('./new', (err) => {
    if (err) throw err;
    console.log('Directory created');
  });
}

/* 
    Checking if a directory exists can be helpful before deleting or creating a new file and or a directory
*/

//delete a directory
if (fs.existsSync('./new')) {
  //remove a directory called new only if it exists
  fs.rmdir('./new', (err) => {
    if (err) throw err;
    console.log('Directory deleted');
  });
}
