// // let admin = (req,res,next) =>{
// //     if(req.user.role === 0 ){
// //         return res.send('you are not allowed, get out now.')
// //     }
// //   if (req.user.hasRole('admin')) {
//    // return res.redirect('/admin');
// //};
// // }

// // module.exports = { admin }
'use strict'
 exports.ensureAdmin = (req, res, next)=> {
     // make sure the user is logged in.
    
//       // make sure the user has role 'admin'
      if (req.user.hasRole('admin')) {
       //return res.redirect('/admin');
       return next();
      }
    
//     // otherwise redirect to login
    return res.redirect('/shop');
   };

// exports.isAdmin = function (req, res, next) {
//     if (!req.session.isLoggedIn) {
//         return res.redirect('/login');
//     }else{
//         if (req.user.hasRole('admin')) {
//             return next();
//           }
//     }
// }
