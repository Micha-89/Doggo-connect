const router = require("express").Router();
const User = require('../models/User');
const Dog = require('../models/Dog')
const bcrypt=require('bcrypt');
const passport = require('passport');
const loginCheck = require('../middleware/loginCheck.js')
const checkRoles = require('../middleware/permissions.js')
const fileUploader = require('../config/cloudinary.config');
const shelter='SHELTER'
const adopter='ADOPTER'

 
router.get('/dogs', checkRoles(shelter), (req, res) => {
 res.render('shelterViews/form')

})

router.post('/dogs',checkRoles(shelter), fileUploader.single('image'), (req, res)=>{
let {name, age, gender, size, breed, description} = req.body;

const imgPath = req.file.path
const publicId = req.file.filename 
if(!name || !age || !gender || !size || !breed || !imgPath ||  !description){
  res.render('shelterViews/form', {message: 'Please provide all the information on the doggo to help find him a home!'})
}else{
  Dog.create(
      {name: name,
      age:age, 
      gender:gender, 
      size: size, 
      breed:breed, 
      imageUrl: imgPath, 
      publicId: publicId,
      description:description, 
      shelter: req.user._id})
  .then(dog=>{
    res.redirect('/dogs/all')
    }).catch(err=>console.log(`Error in Process of Dog creation ${err}`))
  }
})

router.get('/dogs/all', checkRoles(shelter), (req, res)=>{
 const user = req.user._id;
 Dog.find({shelter: user})
 .then(dog=>{
  //  console.log(dog)
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

router.get('/dogs/:id/edit', checkRoles(shelter), (req, res)=>{
  Dog.findById(req.params.id).then(dog=>{
    let optionsGender = '';
    ['female', 'male'].forEach(gender=>{
      let selectedGender='';
      selectedGender = (dog.gender === gender) ? ' selected' : '' 
      optionsGender += `<option value="${gender}" ${selectedGender}> ${gender}  </option>`
    })
  let optionsSize = '';
  ['small', 'middle', 'large'].forEach(size=>{
    let selectedSize = '';
    selectedSize=(dog.size === size) ? ' selected' : '';
    optionsSize += `<option value="${size}"  ${selectedSize}> ${size} </option>`
  })
    res.render('shelterViews/dogEdit', {dog, optionsGender, optionsSize})
  }).catch(err=>console.log(err))
  
})

router.post('/dogs/:id/edit', checkRoles(shelter), fileUploader.single('image'), (req, res)=>{
  const id=req.params.id;
  const {name, age, gender, size, breed, description } = req.body;
  
  
  console.log('Round1', req.file)
  if(req.file){
    console.log('Round2',req.file)
     
    const publicId = req.file.filename 
    const imageUrl = req.file.path;
    Dog.findByIdAndUpdate(id, {name, age, gender, size, breed, description, imageUrl, publicId }, {new: true})
  .then(dog=> res.redirect(`/dogs/${dog._id}`))
  .catch(err=>console.log(err))
  }else{
    console.log('Round3')
    Dog.findByIdAndUpdate(id, {name, age, gender, size, breed, description }, {new: true})
  .then(dog=> res.redirect(`/dogs/${dog._id}`))
  .catch(err=>console.log(err))
  }

  
})


//PROFILE PAGE:  EDIT

router.get('/private/profile/:id', checkRoles(shelter), (req, res)=>{
  const id=req.params.id;
  User.findById(id).then(user=>{
    res.render('shelterViews/profile', {user: user})
  })
})


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
      res.redirect(`/private/profile/${user._id}`)
    }).catch(err=>console.log(err))
   }
 })


 
 

 module.exports=router