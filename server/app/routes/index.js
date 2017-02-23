const router = require('express').Router();
module.exports = router;

// router.use('/exampleRoute', require('./exampleRoute'));

router.use((req, res) => {
	res.sendStatus(404);
});