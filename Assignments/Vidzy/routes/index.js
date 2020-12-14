var express = require('express');
var router = express.Router();

var monk = require('monk');

var db = monk('localhost:27017/vidzy');

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res, next) {
  res.redirect('/videos');
});

router.get('/videos/new', (req, res) => {
  res.render('new');
});

router.get('/videos', function(req, res) {
	var collection = db.get('videos');
	collection.find({}, function(err, videos){
		if (err) throw err;
	  res.render('index', { videos });
	});
});

router.get('/:id', (req, res) => {
  const collection = db.get('videos');
  collection.findOne({ _id: req.params.id }, (err, video) => {
    (err) ? res.send({ error: err.message }) : res.render('show', { video });
  })
});

router.get('/videos/:id/edit', (req, res) => {
  const collection = db.get('videos');
  collection.findOne({ _id: req.params.id })
  .then(video => res.render('edit', { video: video }))
  .catch(err => res.send({ error: err.message }))
});

router.get('/videos/:id', (req, res) => {
  const collection = db.get('videos');
  collection.findOne({ _id: req.params.id })
  .then(video => res.render('show', { video }))
  .catch(err => res.send({ error: err.message }))
});

router.post('/searchVideos', (req, res) => {
  console.log("Title:", req.body.title);
  const searchMovie = new RegExp(req.body.title);
  const collection = db.get('videos');
  collection.find({ title: searchMovie })
  .then(videos => res.send({ videos }))
  .catch(err => res.send({ error: err.message }));
});

router.post('/searchVideo', (req, res) => {
  const searchMovie = new RegExp(req.body.title);
  const collection = db.get('videos');
  collection.find({ title: searchMovie })
  .then(videos => res.render('index', { videos }))
  .catch(err => res.send({ error: err.message }));
});

router.post('/filterVideo', (req, res) => {
  const collection = db.get('videos');
  console.log(req.body.genre);
  collection.find({ genre: req.body.genre })
  .then(videos => res.render('index', { videos }))
  .catch(err => res.send({ error: err.message }));
});

router.post('/videos', (req, res) => {
	const collection = db.get('videos');
  collection.insert({
    title: req.body.title,
    genre: req.body.genre,
    image: req.body.image,
    description: req.body.desc,
  })
  .then(() => res.redirect('/videos'))
  .catch(err => res.send({ error: err.message }))
});

router.delete('/videos/:id', (req, res) => {
  const collection = db.get('videos');
  collection.remove({ _id: req.params.id })
  .then(result => {
    return (result.n === 0) ? res.status(404).send({ error: 'Video does not exist' })
                : res.redirect('/videos');
  })
  .catch(err => res.send({ error: err.message }));
});

router.patch('/videos/:id', (req, res) => {
  console.log('hello before');
  const collection = db.get('videos');
  collection.update({
    _id: req.params.id, 
  }, { $set: {
    title: req.body.title,
    genre: req.body.genre,
    image: req.body.image,
    description: req.body.desc
  }})
  .then(result => {
    console.log('hello after');
    return (result.n === 0) ? res.status(404).send({ error: 'Video does not exist' })
                : res.redirect('/videos');
  })
  .catch(err => res.send({ error: err.message }));
});

module.exports = router;
