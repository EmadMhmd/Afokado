const mongoose = require('mongoose');
const bp = require('body-parser');
const passport = require('passport');
const cors = require('cors');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');




var routes = require('./routes/routes.js');
var app = express();



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


///////////////////////// Middlewares ///////////////////////////////////
app.use(logger('dev'));
app.use(cors());  

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));

app.use(passport.initialize());      
app.use(passport.session());
require('./config/passport.js')(passport);






//////////////////////////////{ DB Configuration} //////////////////////////////
mongoose.connect(process.env.MONGO_DB_URL , { 
  useNewUrlParser: true ,
  useCreateIndex : true
} );
mongoose.connection.on('connected',()=>{
  console.log(`Connected Successfully To Database `)
});
mongoose.connection.on('error',(err)=>{
  console.error(`Failed To Database : ${err}`)
});


app.use('/', routes);

app.use((req, res, next)=>{
  return  res.status[404].send({
    error:'page not found'
  })
});


module.exports = app;
