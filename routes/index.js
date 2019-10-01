const express = require('express');
const router  = express.Router();
const yelp = require('yelp-fusion');
const yelpclient = yelp.client(process.env.YELP_API_KEY, {
  socketTimeout: 5000
});


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index', {
    loggedIn : req.session.currentUser
  });
});

router.get('/the-residents', (req, res, next) => {
  res.render('the-residents')
})

router.get('/the-estate', (req, res, next) => {
  res.render('the-estate')
})

router.get('/contact', (req, res, next) => {
  res.render('contact')
})

router.get('/visit', (req, res, next) => {
  yelpclient.search({
    term: 'spa',
    location: 'warren, nj',
  }).then(searchRes => {
    yelpclient.search({
      term: 'restaurants',
      location: 'warren, nj',
    }).then(featureRes => {
      console.log(featureRes)
      res.render('visit', {searchRes, featureRes})
    }).catch(e => {
      console.log(e);
    });
  }).catch(e => {
    console.log(e);
  });
})




module.exports = router;
