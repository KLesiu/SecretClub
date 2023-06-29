const Msg = require('../models/msg')


exports.msg_create_get = (req,res,next)=>{
    res.render('add-msg-form',{user: req.user})
}