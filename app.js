var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    seedDB = require('./seeds'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    User = require('./models/user'),
    methodOverride = require('method-override'),
    flash = require('connect-flash'),
    dotenv = require('dotenv'),
    app = express();
   
dotenv.config();

var businessRoutes = require('./routes/business'),
    sportsRoutes = require('./routes/sports'),
    techRoutes = require('./routes/technology'),
    healthRoutes = require('./routes/health'),
    userRoutes = require('./routes/user'),
    indexRoutes = require('./routes/index');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/news_website', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify:false,
    useCreateIndex:true
});

// seedDB.del();
// seedDB.add();   
// setInterval(refresh,1000 * 60 * 60);

app.set('view engine','ejs');
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(flash());

app.use(require('express-session')({
    secret:"News Website",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next(); 
});

app.use('/business',businessRoutes);
app.use('/sports',sportsRoutes);
app.use('/technology',techRoutes);
app.use('/health',healthRoutes);
app.use('/',indexRoutes);
app.use('/',userRoutes);

app.listen(process.env.PORT,function(){
    
});
