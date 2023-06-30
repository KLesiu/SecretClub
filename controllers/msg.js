const Msg = require('../models/msg')
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler")

exports.msg_create_get = (req,res,next)=>{
    res.render('add-msg-form',{user: res.locals.currentUser,errors: {}})
}

exports.msg_create_post = [
    body("title").trim().isLength({min:2}).withMessage("Title is required and must have min 2 characters").escape(),
    body("msg").trim().isLength({min:5}).withMessage("Message body is required and must have min 5 characters"),
    asyncHandler(async(req,res,next)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.render("add-msg-form",{
                errors: errors.array(),
                user:res.locals.currentUser
            })
        }
        
        const message = new Msg({
            user: req.user._id,
            title:req.body.title,
            message: req.body.msg
        })
        message.save()
        res.redirect("/")
    })
]