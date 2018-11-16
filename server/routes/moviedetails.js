const express = require('express');
const router = express.Router();
const IMDB = require('../storage/IMDB/models');
const requestpromise = require('request-promise');
const cheerio = require('cheerio');

let movieDetails = {};

router.get('/', (req, res) => {
  res.render('movieInfo', { details: movieDetails });
});

router.post('/getresult', (req, res) => {
  let url = req.body.url;
  if (url && url.length > 0) {
    requestpromise(url, (err, res, html) => {
      if (!err && res.statusCode === 200) {
        const $ = cheerio.load(html);
        const movieTitle = $('.title_wrapper').find('h1').text();
        const plotSummary = $('.summary_text').text().trim();
        const rating = $('.ratingValue').find('strong').text();

        let arr = []
        $('.credit_summary_item').each((i, item) => {
          let obj = {
            listname: $(item).find('h4').text(),
            listresult: $(item).find('a').text()
          }
          arr.push(obj);
        });

        let result = detailsObj(movieTitle, plotSummary, arr, rating)
        IMDB.movieInfo.create({
          name: result.name,
          summary: result.summary,
          director: result.director,
          writer: result.writer,
          stars: result.stars,
          rating: result.rating
        }).then(result => {
          return result;
        }).catch((ex) => {
          res.redirect('/error')
        });
      } else {
        throw new Error('Please try again');
      }
    }).then(() => res.redirect('/'))
      .catch((ex) => {
        res.redirect('/error')
      });
  } else {
    res.redirect('/')
  }
});

router.get('/error', (req, res) => {
  res.render('error');
});

const detailsObj = (movieTitle, plotSummary, arr, rating) => {
  return movieDetails = {
    name: movieTitle,
    summary: plotSummary,
    director: arr[0].listresult,
    writer: arr[1].listresult,
    stars: arr[2].listresult,
    rating: rating
  }
};

module.exports = router;