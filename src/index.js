// ? import dependencies from
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');
const connection = require('./config/db/index');
const route = require('./routes')
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

//? cookie
app.use(cookieParser());


//? render json.body
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());
// ? use dependencies
//? Connect to DB
//db.connection();
//? HTTP logger
app.use(morgan('combined'));
//? Use static files: img, vid
app.use(express.static(path.join(__dirname, 'public')));
//? Template Engine
app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
      if_eq: function (a, b, opts) {
        if (a == b) {
          return opts.fn(this);
        } else {
          return opts.inverse(this);
        }
      }
    }
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource/views'));

//? method-override
app.use(methodOverride('_method'));


// ? Route init
route(app);

const con = function (req, res) {
  connection.connect(function (err) {
    if (err) throw err;
    console.log('db connected');
  })
}

// ? 127.0.0.1: localhost:localhost
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  con;
});