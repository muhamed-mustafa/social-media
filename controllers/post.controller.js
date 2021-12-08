const User       = require('../models/user.model'),
      Post       = require('../models/post.model'),
      fs         = require('fs');

exports.createPost = async (req , res) =>
{
    try 
    { 
       const newPost = await new Post({ ...req.body });
       let image = req.file;

       newPost.image = image.path;
       await newPost.save();
        
       if(image)
       {
            fs.unlinkSync(newPost.image);
       }

       res.status(200).json({status : 200 , newPost , message : "Post created Successfully!" , success : true});
    }

    catch(e)
    {
        res.status(500).send({status : 500 , error : e.message , success : false});   
    }
}

exports.updatePost = async (req , res) =>
{
    try 
    {
       const post = await Post.findById( req.params.id );
       if(post.userId === req.body.userId)
       {
            await Post.updateOne({$set : { ... req.body }});
            res.status(200).json({status : 200 ,message : "Post has been updated Successfully!" , success : true});

       }

       else
       {
            res.status(403).json('you can update only your posts!');
       }
      
    }

    catch(e)
    {
        res.status(500).send({status : 500 , error : e.message , success : false});   
    }
}

exports.deletePost = async (req , res) =>
{
    try 
    {
       const post = await Post.findById( req.params.id );
       if(post.userId === req.body.userId)
       {
            await Post.deleteOne();
            res.status(200).json({status : 200 ,message : "Post has been deleted Successfully!" , success : true});
       }

       else
       {
            res.status(403).json('you can delete only your posts!');
       }
      
    }

    catch(e)
    {
        res.status(500).send({status : 500 , error : e.message , success : false});   
    }
}

exports.likePost = async (req , res) =>
{
    try 
    {
       const post = await Post.findById( req.params.id );
       if(!post.likes.includes(req.body.userId))
       {
           await post.updateOne({ $push : {likes : req.body.userId}});
           res.status(200).json({status : 200 ,message : "The Post has been Liked!" , success : true});
       }
       
       else
       {
            await post.updateOne({ $pull : {likes : req.body.userId}});
            res.status(200).json({status : 200 ,message : "The Post has been unliked!" , success : true});
       }
    }

    catch(e)
    {
        res.status(500).send({status : 500 , error : e.message , success : false});   
    }
}

exports.getPost = async (req , res) =>
{
    try 
    {
       const post = await Post.findById( req.params.id );
       if(!post)
       {
            res.status(404).json('post not found!');
       }

       res.status(200).json({status : 200  , post , success : true});
    }

    catch(e)
    {
        res.status(500).send({status : 500 , error : e.message , success : false});   
    }
}

exports.getAllTimeline = async (req , res) =>
{
    try 
    {
      const currentUser = await User.findById(req.body.userId);
      const userPosts   = await Post.find({ userId : currentUser._id });
      const friendPosts = await Promise.all(
          currentUser.following.map((friendId) =>
          {
              return Post.find({ userId : friendId });
          })
      )
      
      res.json(userPosts.concat(...friendPosts));
    }

    catch(e)
    {
        res.status(500).send({status : 500 , error : e.message , success : false});   
    }   
}