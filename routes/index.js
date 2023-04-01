const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const axios = require('axios');

let cache = null;
/* GET home page. */
router.get('/', (req, res) => {
  axios.get(process.env.API)
    .then(res => {
      const data = res.data.data.memes;
      cache = data
    })
    .catch(err => console.log(err));
  res.render('index', { title: 'Express', user: req.user });
});

router.get('/memes', (req, res) => {
  res.render('memes_overview', {
    title: 'Memes',
    user: req.user,
    memes: cache
  });
});

router.post('/search', (req, res, next) => {
  res.redirect('/search?q=' + req.body.search_form.trim());
});

router.get('/search', (req, res, next) => {
  let queryInput = req.query.q || [];
  let results = cache.filter(x => x.name.includes(queryInput))

  res.render('memes_overview', {
    title: 'Memes',
    user: req.user,
    memes: results
  });
});


router.get('/memes/:ID', (req, res) => {
  const memes = cache.filter(x => x.id === req.params.ID)[0];
  res.render('memes_detail', {
    user: req.user,
    memes: memes
  });
});

module.exports = router;
