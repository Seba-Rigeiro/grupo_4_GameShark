const express = require('express');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'src/views');

const mainRouter = require('./routes/mainrouter');

app.use('/' , mainRouter);

app.listen(3000 , () => console.log('THE SERVER IS RUNING'));