const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    username :
    {
        type     : String,
        required : true,
        trim     : true ,
        min      : 3 ,
        max      : 20 ,
        unique   : true,
    },

    email : 
    {
        type     : String,
        required : true,
        max      : 50 ,
        trim     : true,
    },

    password : 
    {
        type     : String,
        required : true,
        min      : 6
    },

    profilePicture :
    {
        type    : String,
        default : "",
    },

    coverPicture :
    {
        type    : String,
        default : "",
    },

    followers :
    {
        type    : Array,
        default : [],
    },

    following :
    {
        type    : Array,
        default : [],
    },

    isAdmin :
    {
        type    : Boolean, 
        default : false,
    },

    desc :
    {
        type : String,
        max  : 50,
    },
    
    city :
    {
        type : String,
        max  : 50,
    },

    from :
    {
        type : String,
        max  : 50,
    },

    relationship :
    {
        type : Number,
        enum : [1,2,3], // single , married , complicated
    },

    token :
    {
        type : String,
        trim : true
    },

}, {versionKey : false, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

const User  = mongoose.model("User", userSchema);

module.exports = User;