const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const bodyParser=require('body-parser');
const fileUpload=require('express-fileupload');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(bodyParser.urlencoded({extended:true}));

const router = require('./routes/loginSignUp');

dotenv.config({ path: './dotenv.env' });

const errorHandler = require('./middleware/error');




app.use('/api/v1', router);
app.use(errorHandler);

if(process.env.NODE_ENV==="production"){
    app.use(express.static("frontend/build"))
}


module.exports = app;