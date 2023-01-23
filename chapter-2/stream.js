/* 
sometimes it is good not to grab all of the data at once. So, we move it or
use it bit by bit using streams. 

*/

const fs = require('fs');

const rs = fs.createReadStream('./files/lorem.txt', {
  //we can use the path module here
  encoding: 'utf8',
});

const ws = fs.createWriteStream('./files/new-lorem.txt');

//listen for the data coming in from the stream
//rs means read stream
rs.on('data', (dataChunk) => {
  //write to our writable stream
  ws.write(dataChunk);
});

//but there is even a better way to do the above instead of using the listener, we use pipe
//this accomplishes the same thing and piping is more efficient
rs.pipe(ws);
