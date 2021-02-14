const router = require("express").Router();

/* GET home page */
const loginCheck = () => {
  return (req, res, next) => {
    // in node-basic-auth: req.session.user
    // req.isAuthenticated() -> this is a passport function
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/loginUser');
    }
  }
}


router.get("/", (req, res, next) => {
  res.render("index", {user: req.user});
});


router.get('/private', loginCheck(), (req, res) => {
  res.render('userViews/private');
})

module.exports = router;
