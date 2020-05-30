var express = require('express'),
    passport = require('passport'),
    User = require('../models/user'),
    middleWare = require('../middleware/index'),
    router = express.Router();

router.get('/profile',middleWare.isLoggedIn,function(req,res){
    User.findById(req.user._id).populate('favourites').exec(function(err,user){
        if(err){
            console.log(err);
            res.redirect('back');
        }else{
            var articles = user.favourites;
            articles.forEach(function(article){
                article.isFav = true;
            })
            res.render('profile',{user:user,articles:articles.reverse(),title:"GT | Profile"});
        }
    });
});

router.get('/edit',middleWare.isLoggedIn,function(req,res){
    User.findById(req.user._id,function(err,user){
        if(err){
            console.log(err);
            res.redirect('back');
        }else{
            res.render('edit',{user:user});
        }
    });
});

router.put('/edit',middleWare.isLoggedIn,function(req,res){
    User.findById(req.user._id,function(err,user){
        if(err){
            console.log(err);
            res.redirect('back');
        }else{
            user.username = req.body.username;
            user.email = req.body.email;
            user.contact = req.body.contact;
            user.save();
            console.log(user);
            res.redirect('/profile');
        }
    });
})

router.post('/add/:id',middleWare.isLoggedIn,function(req,res){
    User.findById(req.user._id,function(err,user){
        if(err){
            console.log(err);
            res.redirect('back');
        }else{
            user.favourites.push(req.params.id);
            user.save();
            res.json({ success: true });
        }
    });
});


router.delete('/delete/:id',middleWare.isLoggedIn,function(req,res){
    User.findById(req.user._id,function(err,user){
        if(err){
            console.log(err);
            res.redirect('back');
        }else{
            user.favourites.splice(user.favourites.indexOf(req.params.id),1);
            user.save();
            res.json({ success: true });
        }
    })
})

// Auth routes
router.get('/register',middleWare.isLoggedOut,function(req,res){
    res.render('register');
});

router.post('/register',middleWare.isLoggedOut,function(req,res){
    User.register(new User({
            username: req.body.username,
            email: req.body.email,
            contact: req.body.contact
        }),req.body.password,function(err,user){
        if(err){
            console.log(err);
            req.flash('error',err.message);
            res.render('register');
        }else{
            passport.authenticate('local')(req,res,function(){
                req.flash('success', 'Welcome '+user.username);
                res.redirect("/");
            });
        }
    });
});

router.get('/login',middleWare.isLoggedOut,function(req,res){
    res.render('login');
});

router.post('/login',passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/login',
}));

router.get('/logout',function(req,res){
    req.logout();
    req.falsh('success', 'Successfully Logged Out');
    res.redirect('/');
});

module.exports = router;