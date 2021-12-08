const mongoose = require("mongoose");

const postSchema = mongoose.Schema({

    userId :
    {
        type     : String,
        required : true,
    },

    desc :
    {
        type : String,
        max  : 1000,
    },

    image :
    {
        type : String,
    },

    likes :
    {
        type    : Array,
        default : []
    }

}, {versionKey : false, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

const Post  = mongoose.model("Post", postSchema);

module.exports = Post;