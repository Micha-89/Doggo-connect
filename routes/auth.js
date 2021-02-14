const router = require("express").Router();
const User = require('../models/User');
const bcrypt=require('bcrypt');
const passport = require('passport');

/* LOGIN USER*/
router.get("/loginUser", (req, res, next) => {
  res.render("auth/loginUser");
});

router.post(
  '/loginUser',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/loginUser',
    passReqToCallback: true
  })
);
 
 


/* SIGN UP USER*/
router.get("/signupUser", (req, res, next) => {
  res.render("auth/signupUser");
});

router.post("/signupUser", (req, res)=>{
  console.log(req.body)
  const {username, password, email} = req.body;
  if(!username || !password || !email){
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
      User.create({username: username, email: email, password: hash}).then(userDB=>{
        console.log(userDB)
        res.redirect('/')
      }).catch(err=>console.log('Oops!', err))
    }
  }).catch(err=>console.log('Something went wrong', err))
})


module.exports = router;
