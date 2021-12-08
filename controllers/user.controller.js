const User   = require('../models/user.model');
      bcrypt = require('bcrypt');

exports.updateUserInfo = async (req , res) =>
{
    try 
    {
        if(req.body.userId === req.params.id || req.body.isAdmin)
        {
            if(req.body.password)
            {
                try
                {
                    req.body.password = await bcrypt.hashSync(req.body.password , 10)
                }

                catch(e)
                {
                    res.status(500).send({status : 500 , error : e.message , success : false});   
                }
            }

            try
            {
                const user = await User.findByIdAndUpdate(req.params.id , {$set : { ...req.body }});
                res.status(200).json({status : 200 , user , message : "Account Has Been Updated." , success : true});
            }

            catch(e)
            {
                res.status(500).send({status : 500 , error : e.message , success : false});   
            }
        }

        else
        {
            res.status(403).json('You can update only your account!');
        }
    }

    catch(e)
    {
        res.status(500).send({status : 500 , error : e.message , success : false});   
    }
} 

exports.deleteUser = async (req , res) =>
{
    try 
    {
        if(req.body.userId === req.params.id || req.body.isAdmin)
        {
            await User.findByIdAndRemove(req.params.id);
            res.status(200).json({status : 200 , message : "Account Has Been Deleted Successfully." , success : true});
        }

        else
        {
            res.status(403).json('You can delete only your account!');
        }
    }

    catch(e)
    {
        res.status(500).send({status : 500 , error : e.message , success : false});   
    }
} 

exports.getUser = async (req , res) =>
{
    try 
    {
        const user = await User.findById(req.params.id);
        const { password , updated_at , ...other } = user._doc;
        res.status(200).json({status : 200 , user : other , success : true});
    }

    catch(e)
    {
        res.status(500).send({status : 500 , error : e.message , success : false});   
    }
}

exports.followUser = async (req , res) =>
{
    try 
    {
        if(req.body.userId !== req.params.id)
        {
            const user        = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId))
            {
                await user.updateOne({ $push : { followers : req.body.userId }});
                await currentUser.updateOne({ $push : { following : req.params.id }});
                res.status(200).json({status : 200 , message : `${user.username} has been followed`, success : true});
            }

            else
            {
                res.status(403).json(`you already followed ${user.username}`);   
            }
        }

        else
        {
            res.status(403).json('you cant follow yourself.');
        }
    }

    catch(e)
    {
        res.status(500).send({status : 500 , error : e.message , success : false});   
    }   
}

exports.unFollowUser = async (req , res) =>
{
    try 
    {
        if(req.body.userId !== req.params.id)
        {
            const user        = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if(user.followers.includes(req.body.userId))
            {
                await user.updateOne({ $pull : { followers : req.body.userId }});
                await currentUser.updateOne({ $pull : { following : req.params.id }});
                res.status(200).json({status : 200 , message : `${user.username} has been unfollowed`, success : true});
            }

            else
            {
                res.status(403).json(`you dont follow ${user.username}.`);   
            }
        }

        else
        {
            res.status(403).json('you cant unfollow yourself.');
        }
    }

    catch(e)
    {
        res.status(500).send({status : 500 , error : e.message , success : false});   
    }   
}