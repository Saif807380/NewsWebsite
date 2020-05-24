var weather = require('openweather-apis'),
    News = require('../models/news'),
    express = require('express'),
    passport = require('passport'),
    request = require('request'),
    User = require('../models/user'),
    middleWare = require('../middleware/index'),
    router = express.Router();

weather.setLang('en');
weather.setUnits('metric');
weather.setAPPID("67ff1f98098d181b8fa98a0d79da18e4");

router.get('/',function(req,res){
    res.render('landing');
})

router.get('/latest',function(req,res){
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
                }else{
                    res.render('latest',{weather:obj, articles:articles});
                }
            });
        });
    });
});

// Auth routes
router.get('/register',middleWare.isLoggedOut,function(req,res){
    res.render('register');
});

router.post('/register',middleWare.isLoggedOut,function(req,res){
    User.register(new User({username: req.body.username}),req.body.password,function(err,user){
        if(err){
            console.log(err);
            // req.flash('error',err.message);
            res.render('register');
        }else{
            passport.authenticate('local')(req,res,function(){
                // req.flash('success','Welcome to YelpCamp '+user.username);
                res.redirect("/business");
            });
        }
    });
});

router.get('/login',middleWare.isLoggedOut,function(req,res){
    res.render('login');
});

router.post('/login',passport.authenticate('local',{
    successRedirect: '/latest',
    failureRedirect: '/login',
}));

router.get('/logout',function(req,res){
    req.logout();
    res.redirect('/');
});


module.exports = router;