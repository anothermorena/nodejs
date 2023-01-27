//load environment variables
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const { logger } = require('./middleware/logEvents');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser'); //middleware which parses cookies attached to the client request object
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');

const PORT = process.env.PORT || 3500;

mongoose.set('strictQuery', true);

// Connect to MongoDB
connectDB();

//custom middleware logger
app.use(logger);

//handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

//Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

//built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use(express.static(path.join(__dirname, '/public')));

//routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

/*
  All the routes below will be protected and require authentication to be accessed because of the middleware being applied
  If you only want to protect specific routes you  can do so in thier route files.
  Any route that we do not want verified with the JWT should be placed ontop of this comment

*/
app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));

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
  only start the server and listening for requests once our db connection have been established.
  If our connection fails for some reason then we are not going to run the server
*/
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
  );
});
