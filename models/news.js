var mongoose = require('mongoose');

var newsSchema = mongoose.Schema({
    key: {
        title:String,
        content:String,
        image_url:String
    },
    source: String,
    author: String,
    title: {
        type:String,
        unique:false,
    },
    description: String,
    article_url: String,
    image_url: {
        type: String,
        unique: false
    },
    published_at: String,
    content: {
        type:String,
        unique:false
    },
    category: String
});

newsSchema.index({title:1,image_url:1,content:1},{unique:true});

var News = mongoose.model("News",newsSchema);

module.exports = News;