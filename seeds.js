const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('08962c411ff94e7b85fed6959f1ed1e4');
var News = require('./models/news');

categories = ['business','entertainment','general','health','science','sports','technology'];

function del(){
    News.deleteMany({},function(err){
        if(err){
            console.log(err);
        }
        console.log('deleted')
    });
}

function add(){
    categories.forEach(function(c){
        newsapi.v2.topHeadlines({
            category: c,
            language: 'en',
            country: 'us'
        }).then(data=>{
            data.articles.forEach(function(article){
                if(article.title && article.content && article.urlToImage){
                    obj = {
                        key:{
                            title: article.title,
                            content: article.content,
                            image_url: article.urlToImage
                        },
                        title: article.title,
                        content: article.content,
                        category: c,
                        image_url: article.urlToImage
                    };
                    if(article.source.name){
                        obj.source = article.source.name;
                    }
                    if(article.author){
                        obj.author = article.author;
                    }
                    if(article.description){
                        obj.description = article.description;
                    }
                    if(article.url){
                        obj.article_url=article.url;
                    }
                    if(article.publishedAt){
                        var week = ['Sun','Mon','Tues','Wed','Thur','Fri','Sat'];
                        var date = new Date(article.publishedAt);
                        obj.published_at = week[date.getDay()] + ", " + date.getFullYear() + "-" + date.getMonth() + '-' +  date.getDate();
                    } 
                }
                News.create(obj,function(err,article){
                    if(err){
                        // console.log(err);
                    }
                });
            });
        });
    });
}

module.exports = {del:del,add:add}


// var request = require('request'),
//     News = require('./models/news'),



// var url = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=08962c411ff94e7b85fed6959f1ed1e4";

// request(url,function(err,response,body){
//     var data = JSON.parse(body);
//     data.articles.forEach(function(article){
//         News.create({
//             source: article.source.name,
//             author: article.author,
//             title: article.title,
//             description: article.description,
//             article_url: article.url,
//             image_url: article.urlToImage,
//             published_at: article.publishedAt,
//             content: article.content,
//             category: "business"
//         },function(err,article){
//             if(err){
//                 console.log(err);
//             }
//         });
//     });
//     console.log("Done");
// });

