const Movie = require('./../Models/movieModel');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const fs = require('fs');
mongoose.connect(process.env.CONN_STR).then((conn) => {
    console.log("DB connected successfully...!");
}).catch(e => {
    console.log("error");
    console.log(e);
})

const movies = JSON.parse(fs.readFileSync('./data/movies.json', 'utf-8'));
//deleting existinng data
const deletedMovie = async () => {
    try {
        await Movie.deleteMany();
        console.log("Deleted Sucessfully...!");
    } catch(err) {
        console.log(err.message);
    }
    process.exit();
}
//import
const importMovie = async()=>{
    try{
        await Movie.create(movies)
    }catch(err){
        console.log(err.message);
    }
    process.exit();
}
if(process.argv[2]==="--import"){
    importMovie()
}
if(process.argv[2]==="--delete"){
    deletedMovie();
}