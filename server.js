const mongoose=require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});
const app = require('./app');
mongoose.connect(process.env.CONN_STR).then((conn)=>{
    console.log("DB connected successfully...!");
}).catch(e=> {
    console.log("error");
    console.log(e);
})


const port = process.env.port || 3000;
app.listen(port,()=>{
    console.log('Server has started..!');
})