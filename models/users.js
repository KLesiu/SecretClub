const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UsersSchema = new Schema({
   name: {type:String,maxLength:100,required:true},
   email: {type:String,maxLength:100,required:true},
   password: {type:String,maxLength:100,required:true},
   admin: {type:Boolean,required:false},
   member:{type:Boolean,required:true}
})

module.exports = mongoose.model("Users",UsersSchema)
