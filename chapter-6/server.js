const express = require('express');
const app = express();
const path = require('path');

//PORT our webserver will run on
const PORT = process.env.PORT || 3500;

//get request. this is looking for the root
//This regular expression below reads as: the request must begin with a slash and end with a slash or be index.html
//putting the .html inside parentheses and a question mark at the end makes the file extention optional in the request
app.get('^/$|/index(.html)?', (req, res) => {
  // req means request and res means response
  //res.send('Hello World');

  //lets send a file back
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

//handling redirects
//this sends a 302 response code by default but we can change the status code by specifying it at the beginning of the redirect
app.get('/old-page(.html)?', (req, res) => {
  res.redirect(301, '/new-page.html');
});

/*route handlers

the anonymus callback functions containing req and res as parameters following the request are route handlers
We can chain route handlers as seen below. Route handlers work like middleware which we will cover in the next chapter
*/

app.get(
  '/hello(.html)?',
  (req, res, next) => {
    console.log('attempted to load hello.html');
    next(); // moves on to the next handler or calls the next function in the chain
  },
  (req, res) => {
    res.send('Hello World');
  }
);

/* 
Express handles the routes using a water fall model. So it evaluates the requests
as they come in one by one to match them to an end point


*/

//* means all
app.get('/*', (req, res) => {
  //send a custom 404 file with the status code
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

//listen for requests
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
