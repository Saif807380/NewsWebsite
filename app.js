var express = require('express'),
    request = require('request'),
    weather = require('openweather-apis'),
    bodyParser = require('body-parser'),
    app = express();

app.set('view engine','ejs');
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended:true}));

weather.setLang('en');
weather.setUnits('metric');
weather.setAPPID("67ff1f98098d181b8fa98a0d79da18e4");

app.get('/',function(req,res){
    request("https://ipinfo.io?token=9d34b9ef3cc10f",function(err,response,body){
        var data = JSON.parse(body);
        weather.setCity(data.city);
        weather.getAllWeather(function(err, data){
            res.render('landing',{weather:data.main});
        });
    });
    
});
    

app.listen(5000,function(){
    
});
