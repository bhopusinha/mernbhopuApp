const ErroHandler=require('../utils/errorHandler');

module.exports=(err,req,res,next)=>{

    err.statuscode=err.statuscode || 500;
    err.message=err.message || "Internal Server Error!";

    //   console.log("reach here!");

     return res.status(err.statuscode).json({
        success:false,
        message:err.message
    })

}