const passport = require('passport')
const LocaleStrategy = require('passport-local');
const crypto = require('crypto');
const db = require('../db');
const express = require('express');
const fs = require('fs')
const path = require('path');

const router = express.Router();

passport.use(new LocaleStrategy(function verify(username, password, cb) {
    let usersArray = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../lib/db/users.json')));

    console.log('FS',fs.readFileSync(path.resolve(__dirname, '../lib/db/users.json')))
    console.log('JSON parsed',JSON.parse(fs.readFileSync(path.resolve(__dirname, '../lib/db/users.json'))))

    let filteredArray = usersArray.filter(usr => usr.userName === username);
    if (filteredArray.length > 0) {
        let usersData = filteredArray[0];
        if (usersData.password === password) return cb(null, usersData);
    }
}))

router.get('/', (req, res) => {
    if (!req.user) res.render('./users/login', { title: 'Memes', user: null });
    else res.render('./index', { title: 'Memes', user: req.user });
})

router.get('/signup', function (req, res) {
    res.render('./users/signup');
})

router.post('/signup', function (req, res) {
    console.log('new user added', req.user.username, req.user.password);
    res.send('Not yet implemented');
})

/*
   AS per Passport.org
*/

router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
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
/*
passport.use(new LocaleStrategy(function verify(username, password, cb) {
    db.get('SELECT * FROM users WHERE username = ?', [username], function (err, row) {
        if (err) return db(err);
        if (!row) {
            return cb(null, false, { message: 'incorrect username or password' });
        }

        crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function (err, hashedPassword) {
            if (err) return db(err);
            if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
                return cb(null, false, { message: 'Incorrect username or password' })
            }
            return cd(null, row)
        })
    })
}));

router.get('/signup', function (req, res, next) {
    res.render('/users/signup');
})

router.post('/signup', function (req, res, next) {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', function (err, hashedPassword) {
        if (err) return next(err);

        db.run('INSERT INTO users (username, hashed_password, salt) VALUES (?,?,?)', [
            req.body.username,
            hashedPassword,
            salt
        ], function (err) {
            if (err) return next(err);
        });
        const user = {
            id: this.lastID,
            username: req.body.username
        };

        req.login(user, function (err) {
            if (err) return next(err);
            res.redirect('/');
        });
    });
});


*/
module.exports = router;