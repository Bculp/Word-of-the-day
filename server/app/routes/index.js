const router = require('express').Router();
const axios = require('axios');
module.exports = router;

// router.use('/exampleRoute', require('./exampleRoute'));

// can run another query to get syns and ants when push that button or when initial query runs.

// by using wordnik. my limit is 15k per HOUR so no need to have a counter although i can't store their data..
router.get('/keys', (req, res, next) => {
	// get a random word
	axios.get(`http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=${process.env['API-KEY']}`)
	.then(res => res.data)
	.then(result => {
		// get definition, part of speech and examples if they exist
		axios.get(`http://api.wordnik.com:80/v4/word.json/${result.word}/definitions?limit=1&includeRelated=false&useCanonical=false&includeTags=false&api_key=${process.env['API-KEY']}`)
		.then(res => res.data)
		.then(result => res.send(result))
		.catch(next)
	})
	.catch(next)
})

router.use((req, res) => {
	res.sendStatus(404);
});