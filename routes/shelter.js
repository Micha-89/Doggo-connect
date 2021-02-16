const router = require("express").Router();
const User = require('../models/User');
const Dog = require('../models/Dog')
const bcrypt=require('bcrypt');
const passport = require('passport');
const loginCheck = require('../middleware/loginCheck.js')
const checkRoles = require('../middleware/permissions.js')
const shelter='SHELTER'
const adopter='ADOPTER'

 
router.get('/dogs', checkRoles(shelter), (req, res) => {
 res.render('shelterViews/form')

})

router.post('/dogs',checkRoles(shelter), (req, res)=>{
let {name, age, gender, size, breed, image, description} = req.body;

if(!name || !age || !gender || !size || !breed || !image || !description){
  res.render('shelterViews/form', {message: 'Please provide all the information on the doggo to help find him a home!'})
}else{
  Dog.create({name: name, age:age, gender:gender, size: size, breed:breed, image:image, description:description, shelter: req.user._id})
  .then(dog=>{
    res.redirect('/dogs/all')
    }).catch(err=>console.log(err))
  }
})

router.get('/dogs/all', checkRoles(shelter), (req, res)=>{
 const user = req.user._id;
 Dog.find({shelter: user})
 .then(dog=>{
   console.log(dog)
   res.render('shelterViews/allDoggos', {dog: dog})
  }).catch(err=>console.log(err))
})
// 

router.get('/dogs/:id', checkRoles(shelter), (req, res)=>{
  const dogId=req.params.id;
  Dog.findById(dogId).populate('shelter').then(dog=>{
    res.render('shelterViews/showDog', {dog: dog})
  }).catch(err=>console.log(err))
})

//PROFILE PAGE:  EDIT
router.get('/private/profile', checkRoles(shelter), (req, res)=>{
res.render('shelterViews/profileEdit', {user: req.user})
})

router.post('/private/profile', checkRoles(shelter), (req,res)=>{
  const {name, street, city, postcode } = req.body;
  if(!name|| !street || !city ||!postcode){
    res.render('shelterViews/profileEdit', {message: 'Please fill in all the fields'})
  }else{
    User.findByIdAndUpdate(req.user._id, {name, street, city, postcode})
 
    .then(user=>{
     res.render('shelterViews/profile', {user: req.user})
    }).catch(err=>console.log(err))
   }
 })



 module.exports=router