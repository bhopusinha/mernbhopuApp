const server=require('./app');
const mongooseConnection=require('./dotenv/database');
const cloudinary=require('cloudinary');


// server.get('/',(req,res)=>{
//     res.send("hello");
// })

mongooseConnection();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const PORT=process.env.PORT || 4000;


server.listen(PORT,()=>{
    console.log(`server is listening on port http://localhost:${PORT}`)
})

