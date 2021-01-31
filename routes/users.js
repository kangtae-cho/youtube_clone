var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', (req, res) => {
  const user_id = req.body.user_id;
  const user_pw = req.body.user_pw;
});

module.exports = router;
