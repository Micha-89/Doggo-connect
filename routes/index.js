const router = require("express").Router();
const User = require('../models/User');
const bcrypt=require('bcrypt');
const passport = require('passport');
const loginCheck = require('../middleware/loginCheck.js')
const checkRoles = require('../middleware/permissions.js')
const shelter='SHELTER'
const adopter='ADOPTER'


router.get("/", (req, res, next) => {
  res.render("index", {user: req.user});
});


router.get('/private', checkRoles(adopter), (req, res) => {
  
  res.render('userViews/private', {user: req.user});
})

module.exports = router;
