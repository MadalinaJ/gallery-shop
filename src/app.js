const path = require("path");
const http = require("http");
require("dotenv").config();
//var ejs = require("ejs");
const csrf = require('csurf');
const express = require('express');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const User = require('./models/user');
//const ensureAdmin = require('../middleware/admin'.ensureAdmin);
const MongoDBStore = require('connect-mongodb-session')(session);

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${
  process.env.MONGO_PASSWORD
 }@mjshop-d5pjj.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;


const app = express();

const staticController = require('./controllers/staticController');
const adminController = require('./controllers/adminController');
const shopController = require('./controllers/shopController');

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const adminRoutes = require('./routes/admin');
const staticRoutes = require('./routes/static');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "assets")));

app.use(
  session({ 
    secret: 'my secret', 
  resave: false, 
  saveUninitialized: false,
  store: store })
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      
      next();
    })
    .catch(err => console.log(err));
});


app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/admin', adminRoutes);
app.use('/', staticRoutes);
app.use('/shop', shopRoutes);
app.use(authRoutes);

app.use(staticController.index);
app.use(adminController.getProducts);
app.use(adminController.getAddProduct);
app.use(adminController.postAddProduct);
app.use(shopController.getIndex);
app.use(shopController.getProducts);
app.use(shopController.getProduct);

//app.use(authController.getLogin);


app.use(shopController.getCart);
app.use(shopController.postCart);
app.use(shopController.postCartDeleteProduct);
app.use(shopController.getOrders);

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    // https
    //   .createServer({ key: privateKey, cert: certificate }, app)
    //   .listen(process.env.PORT || 3000);
      app.listen(process.env.PORT || 3000);
  })
  .catch(err => {
    console.log(err);
  });
//module.exports = app;
