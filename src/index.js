 const express = require('express');
 const engine = require('ejs-mate');
 const path = require('path');
 const morgan= require('morgan');
 const passport= require('passport');
 const session = require('express-session');
 const flash = require('connect-flash');



// inicializaciones  
const app = express();
require('./database');
require( './passport/local-auth');

//cofiguracion
app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 3000);
app.engine('ejs',engine);
app.set('view engine','ejs');


// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req,res, next)=>{
    app.locals.singupMessage = req.flash('signupMessage');
    app.locals.singinMessage = req.flash('signinMessage');

    next();
})

// raouts 
app.use('/', require('./routes/index'));


// inciando el servidor

app.listen( app.get('port'), ()=> {
    console.log('Server on Port', app.get('port'));
});
