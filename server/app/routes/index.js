const router = require('express').Router();
const axios = require('axios');
module.exports = router;

// router.use('/exampleRoute', require('./exampleRoute'));

router.get('/keys', (req, res, next) => {
	// axios.get('url')
	// .then(res => res.data)
	// .then(result => console.log(result))
	// .catch(console.log('error retrieving result'))

	// res.send(process.env.SECRET_KEY)
})

router.use((req, res) => {
	res.sendStatus(404);
});