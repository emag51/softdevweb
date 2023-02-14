const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const mongoose = require('mongoose')

const dbConfig = require('./config/mongodb.config.js')
const collection = require('./models/customer.js')

const app = express();
const PORT = 3000;

app.set('views', './views');
// app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url).then(() => {
    console.log("connect data")
}).catch(err => {
    console.log("cannot connect")
    process.exit()
})


const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekey",
    saveUninitialized: true,
    cookie: { maxAge: oneDay},
    resave: false
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static(__dirname));

app.use(cookieParser());

const myusername = ''
const mypassword = ''



var session;

app.get('/', (req,res) => {
    session = req.session;
    if(session.userid){
        res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    }
    else{
        res.sendFile('views/index.html',{root:__dirname})
    }
});

app.post('/user', (req,res) => {
    // const check = collection.findOne({usernames:req.body.usernames})
    const check = collection.findOne({test:req.body.CustomerId})

    // if(req.body.username === check.id && req.body.password === check.password){
    if(req.body.username == myusername && req.body.password == mypassword){
    // if(check.password === req.body.password){
        session=req.session;
        session.userid=req.body.username;
        console.log(req.session)
        // res.send(check.CustomerId,`Hello, welcome <a href=\'/logout'>click to logout</a>`);
        res.render('homepage');
        // // res.sendFile('../views/homepage.html', {root:__dirname})
    }
    else{
        res.send('Invalid username or password');
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
    res.render('index.html');
});

// app.get('*', (req, res) => {
//     // res.send('ไม่พบหน้าที่คุณร้องขอ (Error: 404 Page Not Found)')
//     // res.sendFile('views/erorr.html',{root:__dirname})
//     res.render('erorr.html');
// })

app.get('/home', (req,res) => {
    res.render('homepage');
})

app.get('/data', (req,res) => {
    res.render('personal');
})

app.get('/grade', (req,res) => {
    res.render('gradepage');
})

app.get('/gradeY1', (req,res) => {
    res.render('gradeshow');
})


app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));