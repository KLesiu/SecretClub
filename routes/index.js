var express = require('express');
var router = express.Router();
const user_controller = require("../controllers/user")
const msg_controller = require("../controllers/msg")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SecretClub', user: res.locals.currentUser });
});


router.get('/sign-up',user_controller.user_create_get)

router.post('/sign-up',user_controller.user_create_post)

router.get("/log-in",user_controller.user_login_get)

router.post("/log-in",user_controller.user_login_post)

router.get('/add-msg', msg_controller.msg_create_get)

router.post('/add-msg',msg_controller.msg_create_post)


module.exports = router;
