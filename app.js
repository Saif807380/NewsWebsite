var express = require('express'),
    request = require('request'),
    weather = require('openweather-apis'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    News = require('./models/news'),
    seedDB = require('./seeds');
    app = express();

var businessRoutes = require('./routes/business'),
    sportsRoutes = require('./routes/sports'),
    techRoutes = require('./routes/technology');

mongoose.connect('mongodb://localhost/news_website', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify:false,
    useCreateIndex:true
});

// setInterval(refresh,1000 * 60 * 60);

app.set('view engine','ejs');
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended:true}));

weather.setLang('en');
weather.setUnits('metric');
weather.setAPPID("67ff1f98098d181b8fa98a0d79da18e4");

app.get('/',function(req,res){
    res.send("hello");
})

app.get('/latest',function(req,res){
    request("https://ipinfo.io?token=9d34b9ef3cc10f",function(err,response,body){
        var data = JSON.parse(body);
        weather.setCity(data.city);
        weather.getAllWeather(function(err, data){
            News.find({}).limit(16).exec(function(err,articles){
                if(err){
                    console.log(err);
                }else{
                    res.render('latest',{weather:data.main, articles:articles});
                }
            });
        });
    });
});


app.use('/business',businessRoutes);
app.use('/sports',sportsRoutes);
app.use('/technology',techRoutes);

app.listen(5000,function(){
    
});
