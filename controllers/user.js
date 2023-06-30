const bcrypt = require("bcryptjs")
const User = require("../models/users")
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler")
const passport = require("passport");


exports.user_create_get = (req,res,next)=>{
    res.render("sign-up-form",{ user: res.locals.currentUser,errors:[] })
}
exports.user_create_post =[
    body("name","Name is required").trim().isLength({min:1}).escape(),
    body("email", "Email is required").isEmail(),
    body("password","Password must be longer than 5 characters").isLength({min:6}),
    body("cpassword","Repeat password must be the same as password").custom((value,{req})=>{
        return value === req.body.password;
    }),
    
    asyncHandler(async(req,res,next)=>{
        const username = await User.findOne({name:req.body.name})
        const email = await  User.findOne({email:req.body.email})
       
      
       if(username){
  
        return res.render("sign-up-form",{
            user: res.locals.currentUser,
            errors: [{msg: "We have user with that name. Try again."}]
        })
       }
       if(email){
        return res.render("sign-up-form",{
            user: res.locals.currentUser,
            errors: [{msg: "We have user with that email. Try again."}]
        })
       }
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            res.render("sign-up-form",{
                errors: errors.array(),
                user: res.locals.currentUser
            })
           
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
        user: res.locals.currentUser,
        
    })
}
exports.user_login_post=passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/log-in",
       
        
      })
