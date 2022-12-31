require('dotenv').config();

const express = require("express");
const { config, engine } = require('express-edge');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload')
const expressSessiong = require('express-session')
const connectMongo = require('connect-mongo')
const connectFlash = require('connect-flash')
const edge = require('edge.js')
const cloudinary = require('cloudinary')


const createPostController = require('./controllers/createPost')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const createUserController = require('./controllers/Users/createUser')
const storeUserController = require('./controllers/Users/storeUser')
const loginController = require('./controllers/Users/login')
const loginUserController = require('./controllers/Users/loginUser')
const logoutController = require('./controllers/Users/logout')



const validateCreatePostMiddleware = require('./middleware/storePost')
const authMiddleware = require('./middleware/auth')
const redirectIfAuthhMiddleware = require('./middleware/redirectIfAuth')
const confirmPassMiddleware = require('./middleware/confirmPass')




const app = new express();
mongoose.connect(process.env.DB_URL,{ useNewUrlParser: true,useUnifiedTopology: true })


app.use(connectFlash());

cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_NAME,
})

const mongoStore = connectMongo(expressSessiong)
app.use(expressSessiong({
    secret : process.env.EXPRESS_SESSION_KEY,
    store : new mongoStore({
        mongooseConnection : mongoose.connection
    }) 
}))


app.use(fileUpload())

app.use(express.static('public'))

config({ cache: process.env.NODE_ENV === 'production' });
app.use(engine);
app.set('views', `${__dirname}/views`);


app.use('*',(req,res,next) =>{
    app.locals.auth = req.session.userId
    next()
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


app.get('/',homePageController);

app.get('/posts/new',authMiddleware,createPostController);

app.post("/posts/store",authMiddleware,validateCreatePostMiddleware,storePostController);

app.get('/post/:id',getPostController)

app.get('/auth/Register',redirectIfAuthhMiddleware,createUserController)

app.post("/users/Register",redirectIfAuthhMiddleware,confirmPassMiddleware,storeUserController);

app.get('/auth/login',redirectIfAuthhMiddleware,loginController)

app.post('/users/login',redirectIfAuthhMiddleware,loginUserController)

app.get("/auth/logout",authMiddleware,logoutController)

app.use((req,res)=> res.render('notFound'))


app.get('/about',(req,res) => {
    res.render('about')
})

app.get('/contact',(req,res) => {
    res.render('contact')
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

