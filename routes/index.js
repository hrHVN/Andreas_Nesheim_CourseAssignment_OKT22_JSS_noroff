const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express', user: req.user });
});

router.get('/memes', (req, res) => {
  res.render('memes_overview', {
    title: 'Memes',
    user: req.user,
    memes: [
      {
        id: "181913649",
        name: "Drake Hotline Bling",
        url: "https:\/\/i.imgflip.com\/30b1gx.jpg",
        width: 1200,
        height: 1200,
        box_count: 2,
        captions: 0
      }
    ]
  });
});

module.exports = router;
