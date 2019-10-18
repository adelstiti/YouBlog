const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);


const bcrypt = require('bcrypt')
const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true,'Please Enter You username'],
        unique : true
    },
    email : {
        type : String,
        required : [true,'Please Enter You email'],
        unique : true
    },
    password : {
        type : String,
        required : [true,'Please Enter You password'],
    }
})

UserSchema.pre('save',function(next){
   const user = this;
   bcrypt.hash(user.password,10,function(error,encrypted){
    user.password = encrypted ;
    next();
   })

})


module.exports = mongoose.model('User',UserSchema)