var mongoose = require('mongoose');

var newsSchema = mongoose.Schema({
    source: String,
    author: String,
    title: {
        type:String,
        unique:false,
    },
    description: {
        type: String,
        unique:false,
    },
    article_url: String,
    image_url: String,
    published_at: String,
    content: {
        type:String,
        unique:false
    },
    category: String
});

newsSchema.index({title:1,content:1,description:1},{unique:true});

var News = mongoose.model("News",newsSchema);

module.exports = News;