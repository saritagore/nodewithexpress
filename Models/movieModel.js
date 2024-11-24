const mongoose=require('mongoose');
const movieSchema = new mongoose.Schema({
    name:{
        type : String,
        required : [true,'Name is required,,!'],
        unique:true,
        trim:true
    },
    description: {
        type:String,
        required : [true,'Description is required,,!'],
    },
    duration : {
        type : String,
        required : [true,'Duration is required,,!']        
    },
    ratings :{
        type:Number
    },TotalRating:{
        type:Number
    },
    releaseYear:{
        type: Number,
        required : [true,'releaseYear is required,,!']  
    },
    releaseDate:{
        type:Date
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        select:false
    },
    genres:{
        type:[String],
        required : [true,'geners is required,,!']  
    },
    directors:{
        type:[String],
        required : [true,'directors is required,,!']  
    },
    coverImage:{
        type:String,
        required : [true,'coverImage is required,,!']  
    },
    actors:{
        type:[String],
        required : [true,'actors is required,,!']        
    },
    price:{
        type: Number,
        required : [true,'price is required,,!']      
    }
});

movieSchema.virtual('durationInHour').get(function(){
    return this.duration/60;
})
movieSchema.set('toJSON',{virtuals:true});
movieSchema.set('toObject',{virtuals:true});

movieSchema.pre('save',function(){
    console.log(this);
})
const Movie = mongoose.model('Movie',movieSchema);
module.exports = Movie;