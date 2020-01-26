const bcrypt = require('bcryptjs');

const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const { validationResult } = require('express-validator');

const User = require('../models/user');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
    api_key:'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'
    }
  })
);

exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message,
    oldInput: {
      email: '',
      password: ''
    },
    validationErrors: []
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message,
    oldInput: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationErrors: []
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password
      },
      validationErrors: errors.array()
    });
  }

  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.status(422).render('auth/login', {
          path: '/login',
          pageTitle: 'Login',
          errorMessage: 'Invalid email or password.',
          oldInput: {
            email: email,
            password: password
          },
          validationErrors: []
        });
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/shop');
            });
          }
          return res.status(422).render('auth/login', {
            path: '/login',
            pageTitle: 'Login',
            errorMessage: 'Invalid email or password.',
            oldInput: {
              email: email,
              password: password
            },
            validationErrors: []
          });
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch(err => console.log(err));
};




exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
 // const confirmPassword = req.body.confirmPassword;
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
   console.log(errors.array());
   return res.status(422).render('auth/signup', {
     path: '/signup',
     pageTitle: 'Signup',
     errorMessage: errors.array()[0].msg,
     oldInput: {
       email: email,
       password: password,
       confirmPassword: req.body.confirmPassword
     },
     validationErrors: errors.array()
   });
 }
 bcrypt
 .hash(password, 12)
 .then(hashedPassword => {
   const user = new User({
     email: email,
     password: hashedPassword,
     cart: { items: [] }
   });
   return user.save();
 })
 .then(result => {
   res.redirect('/login');
   return transporter.sendMail({
     to: email,
     from: 'shop@mada.com',
     subject: 'Signup succeeded!',
     html: '<h1>yaay!signed up! go back logIn and have fun browsing the shop :D </h1>'
    });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/shop');
  });
};
