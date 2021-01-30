const express = require('express');
const app = express();

app.use(express.static('../public'));
app.set('view engine', 'ejs');

const mainRouter = require('./routes/mainrouter');
const productsRouter = require('./routes/productsrouter');

app.use('/' , mainRouter);
app.use('/' , productsRouter);

app.listen(3000 , () => console.log('THE SERVER IS RUNING'));