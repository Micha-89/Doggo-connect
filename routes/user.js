const router = require("express").Router();
const User = require('../models/User');
const Dog = require('../models/Dog');

router.get('/dogDetails/:id', (req, res) => {
  const dogId = req.params.id;

  Dog.findById(dogId)
  .populate('shelter')
  .then(dogInfo => {
    
    res.render('userViews/dogDetails', { dog : dogInfo})
  })
  .catch(err => {
    console.log(err)
  })
})



module.exports = router;