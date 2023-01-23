// DEALING WITH FILES IN NODE JS USING THE COMMON CORE FILE SYSTEM (fs) MODULE

const fs = require('fs');
const fsPromises = require('fs').promises; //importing promises
const path = require('path');

//read a file
fs.readFile('./files/starter.txt', 'utf8', (err, data) => {
  if (err) throw err;

  console.log(data);
});

//this is just to prove that node is async. It will print out the heloo before while it is waiting for the above file to be read and processed
console.log('Helooo......');

//exit on uncaught errors
process.on('uncaughtException', (err) => {
  console.error(`There was an uncaught error: ${err}`);
  process.exit(1);
});

//read a file using the path module. This gets rid of the slash problem where diffrent os has different styles of using them e.g forward and backward slahes.
//this is a much better approach than the first one
fs.readFile(
  path.join(__dirname, 'files', 'starter.txt'),
  'utf8',
  (err, data) => {
    if (err) throw err;

    console.log(data);
  }
);

//writing files
//we do not need to specify the utf8 as it is by default now.
fs.writeFile(
  path.join(__dirname, 'files', 'reply.txt'),
  'Nice to meet you',
  //the callback function only has an error as we not reading data. We are writing data
  (err) => {
    if (err) throw err;

    console.log('Write complete');
  }
);

//updating a file or adding more content to a file. It will create the file if it does not exist
fs.appendFile(
  path.join(__dirname, 'files', 'test.txt'),
  'Testing text',
  (err) => {
    if (err) throw err;

    console.log('Append complete');
  }
);

//the above method/approach is prone and supscetable to call back hell.
//to resolve them we use promises like below

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, 'files', 'starter.txt'),
      'utf8'
    );

    await fsPromises.writeFile(
      path.join(__dirname, 'files', 'promiseWrite.txt'),
      data
    );

    //delete the specified file
    await fsPromises.unlink(
      path.join(__dirname, 'files', 'starter.txt')
    );
    await fsPromises.appendFile(
      path.join(__dirname, 'files', 'promiseWrite.txt'),
      '\n\nNice to meet you again'
    );
    await fsPromises.rename(
      path.join(__dirname, 'files', 'promiseWrite.txt'),
      path.join(__dirname, 'files', 'promiseComplete.txt')
    );

    const newData = await fsPromises.readFile(
      path.join(__dirname, 'files', 'promiseComplete.txt'),
      'utf8'
    );

    console.log(newData);
  } catch (err) {
    console.error(err);
  }
};

fileOps();
