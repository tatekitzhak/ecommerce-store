const express = require('express');
const { exec } = require('child_process');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet'); // Set security HTTP headers
var hpp = require('hpp'); // Express middleware to protect against HTTP Parameter Pollution attacks

const { apiLimiter_15_minutes,
  createAccountLimiter_1_hour } = require('./middlewares/rateLimiter'); // Rate limiting is a technique used to control the amount of incoming or outgoing
const globalErrHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const { mongooseConnection } = require('./db/connection');
const { port } = require('./config/env');
const app = express();

app.use(morgan('combined'));
app.use(helmet()); // secure apps by setting various HTTP headers
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(hpp());

// General page
app.get('/', apiLimiter_15_minutes, (req, res, next) => {
  res.json({ page: 'Home pag!' })

});


require('./routes/index')(app);

// handle undefined Routes
app.use('/*', (req, res, next) => {
  const err = new AppError(404, 'fail', 'undefined route\n');
  next(err, req, res, next);
});

/* 
 app.all('/books/:i', (req, res, next) => {
   res.json({ books_page: 'books pag!' })
   next()
 });
 */

/* Error handler middleware */
app.use(globalErrHandler);

app.listen(port, () => {
  // open mongoose connection
  mongooseConnection('index.js');
  // Get current git branch name
  exec('git rev-parse --abbrev-ref HEAD', (err, stdout, stderr) => {
    if (err) {
        console.log(`Error:\n ${err}`);
    }

    if (typeof stdout === 'string' && (stdout.trim())) {
      console.log(`Git branch name:\x1b[36m ${stdout.trim()}  \x1b[0m`);
    }
});
  console.log(`server started on: \x1b[36m http://localhost:${port} \x1b[0m`)
});