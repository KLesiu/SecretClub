var express = require('express');
var router = express.Router();
const Message = require('../models/msgs')
const user_controller = require("../controllers/user")
const msg_controller = require("../controllers/msg")

/* GET home page. */
router.get('/', async function(req, res, next) {
  const messages = await Message.find().populate("user").exec()
  
  res.render('index', { title: 'SecretClub', user: res.locals.currentUser,messages:messages, });
});


router.get('/sign-up',user_controller.user_create_get)

router.post('/sign-up',user_controller.user_create_post)

router.get("/log-in",user_controller.user_login_get)

router.post("/log-in",user_controller.user_login_post)

router.get('/add-msg', msg_controller.msg_create_get)

router.post('/add-msg',msg_controller.msg_create_post)

router.post('/check',user_controller.user_check_post)

router.get('/log-out',user_controller.user_log_out)

router.get('/:id/delete',msg_controller.msg_delete_get)



module.exports = router;
