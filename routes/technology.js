var express = require('express'),
    router = express.Router(),
    News = require('../models/news');

router.get('/',function(req,res){
    News.find({$or : [{category:'technology'},{category:'science'}]}).exec(function(err,articles){
        if(err){
            console.log(err);
        }else{
            res.render('show',{articles:articles});
        }
    });
});
    
module.exports = router;