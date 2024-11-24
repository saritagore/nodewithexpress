const mongoose=require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please eneter name"]
    },
    email:{
        type:String,
        required:[true,"Please eneter email"],
        unique:true,
        lowercase:true,
        validator:[validator.isEmail,"Please eneter a valid email"]
    },
    photo:String,
    password:{
        type:String,
        required:[true,"Please eneter password"],
        minlength:8,
    },
    confirmPassword:{
        type:String,
        required:[true,"Please confirm eneter password"],
        validate:{
            validator:function(val){
                return val == this.password;
            },
            message:"password and confirm password is not same..!"
        }
    }
})
userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
   this.password = await bcrypt.hash(this.password,12);
   this.confirmPassword = undefined;
})
const User = mongoose.model('User',userSchema);
module.exports = User;