const express = require('express');
const passport = require('passport');
const User = require('./models/user');
const router = express.Router();

router.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    next();
});

router.get('/', function (req, res, next) {
    User.find()
        .sort({
            createdAt: 'descending'
        })
        .exec(function (err, users) {
            if (err) {
                return next(err);
            }
            res.render('index', {
                users: users
            });
        });
});

router.get('/signup', function (req, res) {
    return res.render('signup');
});

router.post('/signup', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    console.log(next);
    User.findOne({
        username: username
    }, function (err, usr) {
        if (err) {
            return next(err);
        }
        if (usr) {
            req.flash("error", "Username already exists");
            return res.redirect("/signup");
        }
        var newUser = new User({
            username: username,
            password: password
        });
        newUser.save(next);
    });
}, passport.authenticate('login', {
    successRedirect: "/",
    failureRedirect: "/signup",
    failureFlash: true
}));


router.get('/login', function (req, res) {
    res.render('login');
});

router.post('/login', passport.authenticate('login', {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}));

router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("info", "You must be logged in to see this page.");
    res.redirect("/login");
};

router.get('/edit', ensureAuthenticated, function (req, res, next) {
    res.render('edit');
});

router.use(function (err, req, res, next) {
    console.log(err);
    return next();
});


module.exports = router;