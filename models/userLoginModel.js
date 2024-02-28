const mongoose=require('mongoose');
const validater=require('validator');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const userSchema=mongoose.Schema({
   name:{
    type:String,
    required:true,
    minlength:[3,"name should be more than 3 charavter"]
   },
   email:{
    type:String,
    required:true,
    validate:[validater.isEmail,"pls enter your email!"],
    unique:true
   },
   password:{
    type:String,
    minlength:[8,"password should be atleast 8 or more than character!"],
    required:true,
    select:false
   },
   avatar:{
      public_id:{
          type:String,
          required:true
      },
      url:{
          type:String,
          required:true
      } 
  }
})

userSchema.pre('save',async function(next){
   if(!this.isModified("password")){
      next();
   }
   this.password=await bcrypt.hash(this.password,10);

})

userSchema.methods.isCompare=async function(password){
     
   const isPassword=await bcrypt.compare(password,this.password);
   return isPassword;
   
}

userSchema.methods.jwtToken= function(req,res,next){
     
     return jwt.sign({userId:this._id},process.env.SECRET_TOKEN_KEY);
}

module.exports=mongoose.model('UserLogin',userSchema);