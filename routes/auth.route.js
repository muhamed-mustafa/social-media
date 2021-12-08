const router = require('express').Router();
      authController = require('../controllers/auth.controller');

router.post('/register' , authController.signUp);

router.post('/login' , authController.login);

module.exports = router;