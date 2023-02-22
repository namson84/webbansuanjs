const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;
const session = require('express-session')

const route = require('./routes');          
const db = require('./config/db');

//Connect to db
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(session({
    secret: 'dog cat pig',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        //secure: true
    }
  }))

app.use(methodOverride('_method'));

app.use(express.json());

app.use(async function(req,res,next){
    res.locals.admin = req.session.type
    res.locals.login = req.session.isAuthenticated
    res.locals.lcUser = req.session.user
    res.locals.gender = req.session.gender
    next()
})


//Http logger
//app.use(morgan('combined'))

//Template engine
app.engine(
    'hbs',
    handlebars({
        extname: 'hbs',
        helpers:{
            sum: (a,b) => a + b,
        }
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));

//Home, search, contact

//Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});


