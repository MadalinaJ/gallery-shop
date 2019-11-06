// module.exports = (req, res, next) => {
//     if (!req.session.isLoggedIn) {
//         return res.redirect('/login');
//     }
//     next();
// }

module.exports = (roles) => {
  return (req, res, next) => {
      if (req.session.isLoggedIn) {
          if (roles.includes(req.user.roles)) {
              return next();
          }
          console.log('as adm');
      }

      return res.redirect('/login');
      
  }
}
// module.exports =  (req, res, next) => {
//     // make sure the user is logged in.
//     if (!req.session.isLoggedIn) {
//       // make sure the user has role 'admin'
//       if (req.user.hasRole('admin')) {
//         return next();
//       }
//     }
//     // otherwise redirect to login
//     return res.redirect('/login');
//   };