const express = require('express');
const app = express();
const methodOverride = require ('method-override');
const session = require ('express-session')
const auth = require ('./middlewares/auth')

app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(express.static('../public'));
app.use(methodOverride('_method'))
app.use(session({
    secret: 'gameshark',
    resave: false,
    saveUninitialized: true
}))
app.set('view engine', 'ejs');

app.use (auth)

const mainRouter = require('./routes/mainrouter');
const productsRouter = require('./routes/productsrouter');

app.use('/' , mainRouter);
app.use('/' , productsRouter);

app.listen(3000 , () => console.log('THE SERVER IS RUNING'));