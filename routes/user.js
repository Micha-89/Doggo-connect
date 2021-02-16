const router = require("express").Router();
const User = require('../models/User');
const Dog = require('../models/Dog');

router.get('/dogDetails/:id', (req, res) => {
  const dogId = req.params.id;
  const userId = req.user._id;
 
  Dog.findById(dogId)
  .populate('shelter')
  .populate('messages')
  .then(dogInfo => {
    for (i=0; i < dogInfo.messages.length; i++){
      if(dogInfo.messages[i].applicant.equals(userId)){
        res.render('userViews/dogDetailsA', { dog : dogInfo})
        return
      } 
    }
    res.render('userViews/dogDetails', { dog : dogInfo})
  })
  .catch(err => {
    console.log(err)
  })
})

router.post('/dogDetails/:id/application', (req,res) => {
  const dogId = req.params.id;
  const userId = req.user._id
  const {message} = req.body
  
  if(message == '') {
    Dog.findById(dogId)
    .populate('shelter')
    .then(dogInfo => {
      res.render('userViews/dogDetails', { dog:dogInfo })
    })
    .catch(err => {
      console.log(err)
    })
    return
  }
 
  const messageObject = { message: message, applicant: userId}

  Dog.findByIdAndUpdate(dogId, {
    $push: { messages: messageObject }
  })
  .then(dogInfo => {
    res.redirect(`/dogDetails/${dogInfo._id}`)
  })
  .catch(err => {
    console.log(err)
  })

})



module.exports = router;