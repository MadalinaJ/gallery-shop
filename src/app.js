const path = require("path");
require("dotenv").config();
var ejs = require("ejs");
const express = require('express');
const bodyParser = require('body-parser');
const staticController = require('./controllers/staticController');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));




const staticRoutes = require('./routes/static');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "assets")));



app.use('/', staticRoutes);


app.use(staticController.index);



module.exports = app;