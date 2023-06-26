const bcrypt = require("bcryptjs")
const User = require("../models/users")


exports.user_create_get = (req,res,next)=>{
    res.render("sign-up-form",{})
}
exports.user_create_post = async(req,res,next)=>{
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
}