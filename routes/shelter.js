const router = require("express").Router();
const User = require('../models/User');
const Dog = require('../models/Dog')
const bcrypt=require('bcrypt');
const passport = require('passport');
const loginCheck = require('../middleware/loginCheck.js')
const checkRoles = require('../middleware/permissions.js')
const shelter='SHELTER'
const adopter='ADOPTER'


  

router.get('/dogCreation', checkRoles(shelter), (req, res) => {
 res.render('shelterViews/form')

})

router.post('/dogCreation',checkRoles(shelter), (req, res)=>{
let {name, age, gender, size, breed, image, description} = req.body;
Dog.create({name: name, age:age, gender:gender, size: size, breed:breed, image:image, description:description, shelter: req.user._id})
.then(dog=>{
  res.redirect('/private')
})

})




 module.exports=router