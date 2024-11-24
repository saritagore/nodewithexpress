const User = require('./../Models/userModel');
const asyncErrorHandler = (func) => {
    return (req,res,next)=>{
        func(req, res, next).catch(err => next(err))
    }
    }
// exports.signup = asyncErrorHandler(async(req,res,next)=>{
// const newUser = await User.create(req.body);
// res.status(201).json({
//     status:'success',
//     data:{
//         user:newUser
//     }
// })
// })
exports.signup = async(req,res,next)=>{
try{
    const newUser = await User.create(req.body);
    res.status(201).json({
        status:'success',
        data:{
            user:newUser
        }
    })
}catch(err){
    res.status(404).json({
        status:'fail',
        data:{
            message:err.message
        }
    })
}
}