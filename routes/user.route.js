const router         = require('express').Router();
      userController = require('../controllers/user.controller');
      
router.patch('/:id' , userController.updateUserInfo);

router.delete('/:id' , userController.deleteUser);

router.get('/:id' , userController.getUser);

router.patch('/:id/follow' , userController.followUser);

router.patch('/:id/unfollow' , userController.unFollowUser);

module.exports = router;