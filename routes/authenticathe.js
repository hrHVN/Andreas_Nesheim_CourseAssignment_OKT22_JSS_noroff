const passport = require('passport')
const LocaleStrategy = require('passport-local');
const express = require('express');
const fs = require('fs')
const path = require('path');
const router = express.Router();


passport.use(new LocaleStrategy(function verify(username, password, cb) {
    let usersArray = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../lib/db/users.json')));

    let filteredArray = usersArray.filter(usr => usr.username == username);
    if (filteredArray.length > 0) {
        let usersData = filteredArray[0];
        if (usersData.password == password) return cb(null, usersData);
    }
}))

router.get('/', (req, res) => {
    if (!req.user) res.render('./users/login', { title: 'Memes', user: null });
    else res.render('./index', { title: 'Memes', user: req.user });
})

router.get('/signup', function (req, res) {
    res.render('./users/signup', { title: 'Signup', user: req.user });
})

router.post('/signup', function (req, res, next) {
    let userDb = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../lib/db/users.json')));

    if (userDb.find(x => x.username == req.body.username) === undefined) {
        // Catch existing user, not case sensetive
        userDb.push({
            username: req.body.username,
            password: req.body.password
        })
        console.log('if not:',userDb)
        fs.writeFileSync(path.resolve(__dirname, '../lib/db/users.json'), JSON.stringify(userDb))
    }
    else{
        res.redirect('/');
    }
    res.render('./users/login', { title: 'Memes', user: req.user });
})

/*
   AS per Passport.org
*/

router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users'
}));

router.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) next(err);
        res.render('./index', { title: 'Memes', user: req.user });
    });
});

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id, username: user.username });
    })
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});


module.exports = router;