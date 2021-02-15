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
if(!name || !age || !gender || !size || !breed || !image || !description){
  res.render('shelterViews/form', {message: 'Please provide all the information on the doggo to help find him a home!'})
}else{
  Dog.create({name: name, age:age, gender:gender, size: size, breed:breed, image:image, description:description, shelter: req.user._id})
  .then(dog=>{
    res.render('shelterViews/showDog', {dog: dog})
    })
  }
})

router.get('/:user', checkRoles(shelter), (req, res)=>{
 const user = req.user._id;
 Dog.find({shelter: user}).then(dog=>{
   console.log(dog)
  })
})


// profile page
router.get('/profile',checkRoles(shelter),(req, res)=>{
  res.render('shelterViews/profileEdit', {user: req.user})
})

router.get('/profile',checkRoles(shelter), (req, res)=>{
res.render('shelterViews/profile')
})

router.post('/profile', checkRoles(shelter), (req,res)=>{
  const {name, street, city, postcode } = req.body;
  if(!name|| !street || !city ||!postcode){
    res.render('shelterViews/profileEdit', {message: 'Please fill in all the fields'})
  }else{
    User.findByIdAndUpdate(req.user._id, {name, street, city, postcode})
 
    .then(user=>{
     res.render('shelterViews/profile', {user: req.user})
    })
   }
 })



 module.exports=router