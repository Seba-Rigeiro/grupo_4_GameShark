const express = require('express');
const app = express();
const methodOverride = require ('method-override');
const session = require ('express-session')
const auth = require ('./middlewares/auth')
const cors = require('cors');

app.use(cors());
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
const usersRouter = require('./routes/usersrouter');
const productRouter = require('./routes/api/productRouter');
const userRouter = require('./routes/api/userRouter');
const platformRouter = require('./routes/api/platformRouter');
const categoryRouter = require('./routes/api/categoryRouter');
const { request } = require('express'); 

app.use('/', mainRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/api', productRouter);
app.use('/api', userRouter);
app.use('/api', platformRouter);
app.use('/api', categoryRouter);

app.listen(3001 , () => console.log('THE SERVER IS RUNNING'));