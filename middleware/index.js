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
    isLoggedIn:isLoggedIn,
    isLoggedOut:isLoggedOut
}