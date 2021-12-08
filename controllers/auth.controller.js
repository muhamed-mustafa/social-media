const User   = require('../models/user.model');
      jwt    = require('jsonwebtoken'),
      bcrypt = require('bcrypt');

exports.signUp = async (req , res) =>
{
    try 
    {
        const user = new User({ ...req.body , password : bcrypt.hashSync(req.body.password , 10) });
        await user.save();
        res.status(200).json({status : 200 , user , success : true});
    }

    catch(e)
    {
        res.status(500).send({status : 500 , error : e.message , success : false});   
    }
}

exports.login = async (req , res) =>
{
    try 
    {
        const user = await User.findOne({email : req.body.email});
        !user && res.status(404).json("User is not found!");

        const validPassword = await bcrypt.compareSync(req.body.password , user.password);
        !validPassword && res.status(404).json("Wrong Password!");

        // generate Token 
        let generateToken = jwt.sign({ _id : user._id.toString()}, process.env.JWT_SECRET, 
        {
            expiresIn: 2592000 // expires in 1 month
        });

        user.token = generateToken;
        await user.save();

        res.status(200).json({status : 200 , user : user , success : true});
    }

    catch(e)
    {
        res.status(500).send({status : 500 , error : e.message , success : false});   
    }
}