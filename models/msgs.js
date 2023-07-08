const mongoose = require("mongoose")


const Schema = mongoose.Schema

const MsgSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "Users",required:true},
    title: {type:String,required:true},
    message: {type:String,required:true},

})


module.exports = mongoose.model('Message', MsgSchema)