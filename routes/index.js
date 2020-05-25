var weather = require('openweather-apis'),
    News = require('../models/news'),
    User = require('../models/user'),
    express = require('express'),
    request = require('request'),
    middleWare = require('../middleware/index'),
    router = express.Router();

weather.setLang('en');
weather.setUnits('metric');
weather.setAPPID("67ff1f98098d181b8fa98a0d79da18e4");

router.get('/',function(req,res){
    res.render('landing');
})

router.get('/latest',middleWare.isLoggedIn,function(req,res){
    request("https://ipinfo.io?token=9d34b9ef3cc10f",function(err,response,body){
        var data = JSON.parse(body);
        weather.setCity(data.city);
        weather.getAllWeather(function(err, data){
            obj = {};
            obj.main = data.main;
            obj.description = data.weather[0].description;
            News.find({}).limit(16).exec(function(err,articles){
                if(err){
                    console.log(err);
                    res.redirect('back');
                }else{
                    User.findById(req.user._id,function(err,user){
                        if(err){
                            console.log(err);
                            res.redirect('back');
                        }
                        articles.forEach(function(article){
                            article.isFav = false;
                            user.favourites.forEach(function(post){
                                if(article._id.equals(post._id)){
                                    article.isFav = true;
                                }
                            });
                        });
                        res.render('latest',{weather:obj, articles:articles});
                    });
                }
            });
        });
    });
});


module.exports = router;