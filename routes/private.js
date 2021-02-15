const router = require("express").Router();
const User = require('../models/User');
const bcrypt=require('bcrypt');
const passport = require('passport');
const loginCheck = require('../middleware/loginCheck.js')
const checkRoles = require('../middleware/permissions.js')
const shelter='SHELTER'
const adopter='ADOPTER'







router.get('/private', loginCheck(), (req, res) => {
  if(req.user.role === shelter){
    res.render('shelterViews/private', {user: req.user})
  }else{
    res.render('userViews/private', {user: req.user});
  }
})


 
 

module.exports = router;
