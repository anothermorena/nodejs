const express = require('express');
const app = express();
const path = require('path');
const { logger } = require('./middleware/logEvents');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

//PORT our webserver will run on
const PORT = process.env.PORT || 3500;

/* CUSTOM MIDDLEWARE LOGGER

The built in middle ware does not need the next call. But custom ones do

*/
app.use(logger);

/*
  cross origin resource sharing

  If your api is open to the public you can use the cors middleware without
  specifying the websites to be allowed. But in many applications thats not what you
  want so you should create a whitelist of accpeted websites

*/

const whitelist = [
  'https://www.google.com',
  'http://127.0.0.1:5500',
  'http://localhost:3500',
];
const corsOptions = {
  origin: (origin, callback) => {
    //if the domain is in the whitelist, let it pass.
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

/* 
Built in middleware to handle urlencoded data. In other words, form data:
'content-type: application/x-www-form-urlencoded'. It allows us to pull data
from a url as a parameter

We use the use property to apply a middleware. Just like all our http methods,
It still works like a water fall. So if we put app.use above our routes, then
it will apply to all routes that come below it.
*/
app.use(express.urlencoded({ extended: false }));

/*
built in middleware for json
if json data is submitted we need to be able to get the data from it.
*/
app.use(express.json());

/*
 Serve static files.
 Express makes this files readily available for the public
 Because it is applied before our routes, it will search the
 public direcotry before it moves to our routes.
*/
app.use(express.static(path.join(__dirname, '/public')));

//tell express to use the public directory for the subdir routes as well
//on the top one we did not specify a directory but the default is /
app.use('/subdir', express.static(path.join(__dirname, '/public')));

//routes
app.use('/', require('./routes/root'));

//route any request coming to the subdirectory to the router instead of the routers provided below
app.use('/subdir', require('./routes/subdir'));
app.use('/employees', require('./routes/api/employees'));

/* 
Express handles the routes using a water fall model. So it evaluates the requests
as they come in one by one to match them to an end point


*/

//* means all
app.get('/*', (req, res) => {
  //send a custom 404 file with the status code
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

app.use(errorHandler);

/*
app.use vs app.all

app.use if mostly used for middle ware and it does not accept regex. app.all is mostly applied to rounting and it will apply to all http verbs. 

app.use() and app.all() are both methods in Express.js that handle routing, but they have slightly different functionality.

app.use() is used to mount middleware functions at a path, and it will match any HTTP verb (GET, POST, etc.). It takes two arguments, the first is the path, and the second is the function that handles the request.

app.all() is similar to app.use(), but it will match any HTTP verb. It also takes two arguments, the first is the path, and the second is the function that handles the request.

In general, app.use() is used for middleware that should be executed for all routes, and app.all() is used when you want to handle a specific route for all HTTP verbs.

*/

//listen for requests
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
