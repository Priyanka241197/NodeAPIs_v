const express = require('express');
require('dotenv').config();
require('./database/connection');
var bodyParser = require('body-parser')
var cors = require('cors')

// dbConfig();
const app = express();
app.use(cors())
app.use(bodyParser.json())
app.get('/',(req,res) =>{
    res.send("app is running")
})

const UserRoute = require('./src/routes/user.route');
app.use('/user',UserRoute);

const BrandRoute = require('./src/routes/brand.route');
app.use('/brand',BrandRoute);

const catagoryRoute = require('./src/routes/category.route');
app.use('/category',catagoryRoute);

const port =  3000
app.listen(port, () =>{
    console.log("app is listing on port --->",port)
})

