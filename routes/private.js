const router = require("express").Router();
const User = require('../models/User');
const bcrypt=require('bcrypt');
const passport = require('passport');
const loginCheck = require('../middleware/loginCheck.js')
const checkRoles = require('../middleware/permissions.js')
const Dog = require('../models/Dog')
const shelter='SHELTER'
const adopter='ADOPTER'



router.get('/private', loginCheck(), (req, res) => {
  if(req.user.role === shelter){
    res.render('shelterViews/private', {user: req.user})
  }else{

    Dog.find()
    .then(dogsfromDB => {
      console.log(dogsfromDB)
      res.render('userViews/private', { dog: dogsfromDB, user: req.user});
    }).catch(err => {
      console.log(err);
    })
    
  }
})


 
 

module.exports = router;
