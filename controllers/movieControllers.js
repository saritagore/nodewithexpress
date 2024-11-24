
const Movie = require('./../Models/movieModel');
const ApiFeatures = require('./../utils/ApiFeatures')
//route handler functions
exports.getAllMovies = async (req, res) => {
    try {
        const features = new ApiFeatures(Movie.find(),req.query).filter().sort().limitFields().pagination();
        const movies = await features.query;
        
        res.status(200).json({
            status: "success",
            TotalCount: movies.length,
            data: {
                movies
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}
exports.getMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data: {
                movie
            }
        })
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }
}
const asyncErrorHandler = (func) => {
    return (req,res,next)=>{
        func(req, res, next).catch(err => next(err))
    }
    }
exports.addMovie = asyncErrorHandler(async (req, res) => {
        const movie = await Movie.create(req.body);
        res.status(201).json({
            status: "success",
            data: {
                movie
            }
        })
})
exports.validateBody = (req, res, next) => {
    if (!req.body.name || !req.body.duration) {
        return res.status(404).json({
            status: "fail",
            message: "Not a valid movie data"
        })
    }
    next();
}
exports.updateMovie = async (req, res) => {
    try {
       const updateMovie = await  Movie.findByIdAndUpdate(req.params.id, req.body, { new: true,runValidators:true });
       res.status(200).json({
        status:"success",
        data:{
            updateMovie
        }
       })
    } catch (err) {
        res.status(404).json({
            status: "fail",
            data: {
                message: err.message
            }
        })
    }

}
exports.deleteMovie = async(req, res) => {
    try {
       await Movie.findByIdAndDelete(req.params.id);
        res.status(204).json({
         status:"success",
         data:null
        })
     } catch(err) {
         res.status(404).json({
             status: "fail",
             data: {
                 message: err.message
             }
         })
     }
}
exports.getMovieStats=async(req,res)=>{
try{
    const stats= await Movie.aggregate([
        {$match:{ratings:{$gte:5.5}}},
        {$group:{
            _id:'$releaseYear',
            avgRating:{$avg:'$ratings'},
            avgPrice:{$avg:'$price'},
            minPrice:{$min:'$price'},
            maxPrice:{$max:'$price'},
            priceTotal:{$sum:'$price'},
            movieCount:{$sum:1}
        }},
        { $sort:{minPrice:1}}
    ]);
    res.status(200).json({
        status:"success",
        count:stats.length,
        data:{
            stats
        }
       })
}catch(err){
    res.status(404).json({
        status: "fail",
        data: {
            message: err.message
        }
    })
}
}
exports.getMovieByGenre=async(req,res)=>{
    try{
        const genre = req.params.genre;
        const movies= await Movie.aggregate([
            {$unwind:'$genres'},
            {$group:{
                _id:'$genres',
                movieCount:{$sum:1},
                movies:{$push:'$name'}
            }},
            {$addFields:{genre:"$_id"}},
            {$project:{_id:0}},
            {$sort:{movieCount:-1}},
            {$match:{genre:genre}}
        ]);
        res.status(200).json({
            status:"success",
            count:movies.length,
            data:{
                movies
            }
           })
    }catch(err){
        res.status(404).json({
            status: "fail",
            data: {
                message: err.message
            }
        })
    }
    }

