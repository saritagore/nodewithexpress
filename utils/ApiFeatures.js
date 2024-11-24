class ApiFeatures{
    constructor(query,queryStr){
    this.query = query;
    this.queryStr = queryStr;
    }
    filter(){
        const excludes = ['sort','page','limit','fields'];
        let queryObj1={...this.queryStr};
        excludes.forEach((el)=>{
            delete queryObj1[el];
        })
        let queryString = JSON.stringify(queryObj1);
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g,(m)=>`$${m}`);
        const queryObj =  JSON.parse(queryString);
        this.query =  this.query.find(queryObj);
        console.log('hi',this.query);
        return this;
    }
    sort(){
        if(this.queryStr.sort){
            const sortBy = this.queryStr.sort.split(',').jpin(' ');
            this.query = this.query.sort(sortBy);
        }else{
            this.query = query.sort('-createdAt');
        }
        return this;
    }
    limitFields(){
        if(this.queryStr.fields){
            const fields = this.queryStr.fields.split(',').join(' ');
           this.query =  this.query.select(fields);
        }else{
            this.query =  this.query.select('-__v');
        }
        return this;
    }
    pagination(){
        const page = this.queryStr.page*1 || 1;
        const limit = this.queryStr.limit*1 || 10;
        const skip  = (page-1)*limit;
        this.query = this.query.skip(skip).limit(limit);
        // if(this.queryStr.page){
        //     const movieCount =  this.query.countDocuments();
        //     if(skip>=movieCount){
        //         throw new Error("This page is not found...!")
        //     }
        // }
        return;
    }
}
module.exports= ApiFeatures;