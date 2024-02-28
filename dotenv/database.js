const mongoose=require('mongoose');


const mongooseConnection=()=>{
    mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log('successfully connected to database !');
    }).catch((e)=>{
        console.log(e);
    })
}


module.exports=mongooseConnection;