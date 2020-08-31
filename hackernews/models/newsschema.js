const mongoose = require('mongoose');

const newsschema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

const News = mongoose.model("News",newsschema);
module.exports = News;