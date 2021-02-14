const loginCheck = () => {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/loginUser', {message: 'Please'});
    }
  }
}

module.exports = loginCheck