const router         = require('express').Router();
      postController = require('../controllers/post.controller');
      
router.post('/create-post' , postController.createPost);

router.patch('/update-post/:id' , postController.updatePost);

router.delete('/delete-post/:id' , postController.deletePost);

router.patch('/:id/like' , postController.likePost);

router.get('/:id' , postController.getPost);

router.get('/timeline/all' , postController.getAllTimeline);

module.exports = router;