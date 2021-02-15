const router = require("express").Router();
const User = require('../models/User');
const bcrypt=require('bcrypt');
const passport = require('passport');

/* LOGIN USER*/
router.get("/loginUser", (req, res, next) => {
  res.render("auth/loginUser");
});



router.post('/loginUser', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      // Something went wrong authenticating user
      return next(err);
    }
 
    if (!theUser) {
      // Unauthorized, `failureDetails` contains the error messages from our logic in "LocalStrategy" {message: '…'}.
      res.render('auth/loginUser', { message: 'Ooops, wrong password or username' });
      return;
    }
    
 
    // save user in session: req.user
    req.login(theUser, err => {
      if (err) {
        // Session save went bad
        return next(err);
      }
      
      // All good, we are now logged in and `req.user` is now set
      res.redirect('/private');
    });
  })(req, res, next);
});

/* LOGOUT  USER*/

router.get('/logout', (req, res)=>{
  req.logout();
  res.redirect('/')
})


/* SIGN UP USER*/
router.get("/signupUser", (req, res, next) => {
  res.render("auth/signupUser");
});

router.post("/signupUser", (req, res)=>{
 
  const {username, password, email, role} = req.body;
  if(!username || !password || !email|| !role){
    res.render('auth/signupUser', {message: 'All fields are mandatory'})
    return 
  } 
  if(password.length<8){
    res.render('auth/signupUser', {message: 'Your password must be longer than 8 characters'})
    return
  }
  User.findOne({username: username}).then(userDB=>{
    if(userDB !== null){
    res.render('auth/signupUser', {message: 'This username is taken. Choose another 👀!'})
    }else{
      const salt=bcrypt.genSaltSync(10);
      const hash=bcrypt.hashSync(password, salt)
      User.create({username: username, email: email, password: hash, role: role}).then(userDB=>{
        // passport.authenticate('local', {
        //   successRedirect: '/private',
        //   failureRedirect: '/signupUser',
        //   session: true,

        // });
        req.login(userDB, err => {
          if (err) {
            // Session save went bad
            return next(err);
          }
     
          // All good, we are now logged in and `req.user` is now set
          res.redirect('/private');
        });
        // console.log(userDB)
        // res.redirect('/')
      }).catch(err=>console.log('Oops!', err))
    }
  }).catch(err=>console.log('Something went wrong', err))
})

router.get('/logout', (req, res)=>{
  req.logout();
  res.redirect('/')
})

module.exports = router;
