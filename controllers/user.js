const bcrypt = require("bcryptjs")
const User = require("../models/users")
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler")
const passport = require("passport");


exports.user_create_get = (req,res,next)=>{
    res.render("sign-up-form",{
        loggedIn: false
    })
}
exports.user_create_post =[
    body("name","Name is required").trim().isLength({min:1}).escape(),
    body("email").isEmail(),
    body("password","Password must be longer than 5 characters").isLength({min:6}),
    body("cpassword","Repeat password must be the same as password").custom((value,{req})=>{
        return value === req.body.password;
    }),
    asyncHandler(async(req,res,next)=>{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            res.render("sign-up-form",{
                errors: errors.array(),
                loggedIn: false
            })
            console.log(errors.array())
            return
        }
        try{
            bcrypt.hash(req.body.password,10,async(err,hashedPass)=>{
                if(err){
                    return console.log(err)
                }
                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPass,
                    admin:false,
                    member: false
    
                }).save()
                
            })
            
           res.redirect("/")
        }catch(err){
            return next(err)
        }
    })
    
    
    ] 

exports.user_login_get = (req,res,next)=>{
    res.render("log-in-form",{
        loggedIn: false
    })
}
exports.user_login_post=
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/log-in",
       
        
      })
