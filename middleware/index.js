// var Campground = require('../models/campground');
// var Comment = require('../models/comment');


// function checkCampgroundOwnership(req,res,next){
//     if(req.isAuthenticated()){
//         Campground.findById(req.params.id,function(err,foundCampground){
//             if(err){
//                 console.log(err);
//                 req.flash('error','Campground not found');
//                 res.redirect('back');
//             }else{
//                 if(foundCampground.author.id.equals(req.user._id)){
//                     next();
//                 }else{
//                     req.flash('error',"You don't have permission to that");
//                     res.redirect('back');
//                 }
//             }
//         });
//     }else{
//         req.flash('error','You need to be logged in to do that'); 
//         res.redirect('back');
//     }
// } 

// function checkCommentOwnership(req,res,next){
//     if(req.isAuthenticated()){
//         Comment.findById(req.params.id,function(err,foundComment){
//             if(err){
//                 console.log(err);
//                 req.flash('error','Comment not found');
//                 res.redirect('back');
//             }else{
//                 if(foundComment.author.id.equals(req.user._id)){
//                     next();
//                 }else{
//                     req.flash('error',"You don't have permission to that");
//                     res.redirect('back');
//                 }
//             }
//         });
//     }else{
//         req.flash('error','You need to be logged in to do that'); 
//         res.redirect('back');
//     }
// }


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error','You need to be logged in to do that');
    res.redirect('/login');
}

function isLoggedOut(req,res,next){
    if(!req.isAuthenticated()){
        return next();
    }
    req.flash('success','You are already logged in');
    res.redirect('/');
}

module.exports = {
    // checkCampgroundOwnership:checkCampgroundOwnership,
    // checkCommentOwnership:checkCommentOwnership,
    isLoggedIn:isLoggedIn,
    isLoggedOut:isLoggedOut
}