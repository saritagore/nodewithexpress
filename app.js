const express = require('express');
let app = express();
const movieRouter = require('./routes/movieRoutes.js');
const authRouter = require('./routes/authRouter.js');
const logger = function(req,res,next){
    console.log("custom middle wear");
    next();
}
const morgan = require('morgan');
if(process.env.NODE_ENV === 'development'){
    app.use(express.static('./public'))
}
app.use(express.json());
app.use(morgan('dev'));
app.use(logger);
app.use((req,res,next)=>{
    req.reqestedAt= new Date().toISOString();
    next();
})
app.use('/api/v1/movies',movieRouter);
app.use('/api/v1/users',authRouter);
app.all('*',(req,res,next)=>{
// res.status(404).json({
//     status:'fail',
//     messae:`Cant's find ${req.originalUrl} on Server`
// })
const err=new Error(`Cant's find ${req.originalUrl} on Server`);
err.status = 'fail',
err.statusCode=404;
next(err)
})
app.use((error,req,res,next)=>{
    error.statusCode = error.statusCode|| 500;
    error.status = error.status || 'error';
    res.status(error.statusCode).json({
        status:error.statusCode,
        message:error.status
    })
})
module.exports = app;