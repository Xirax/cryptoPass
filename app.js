const express = require('express');
const app = express();

const path = require('path');

const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routers/indexRouter');

const PORT = 3434;

app.use(express.static(path.join(__dirname, 'static')));

app.set('views', path.join(__dirname, 'views'));   
app.set('view engine', 'ejs');
app.set('layout', 'layouts/default');

app.use(expressLayouts);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use('/', indexRouter);

app.listen(PORT, function(){
    console.log('RUNNING [ ' + PORT + ' ]'); 
})


