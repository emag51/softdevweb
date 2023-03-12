const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const mongoose = require('mongoose')

const dbConfig = require('./config/mongodb.config.js')
const collection = require('./models/customer.js');
const { render } = require('ejs');
const { findOne } = require('./models/customer.js');

const app = express();
const PORT = 3000;

app.set('views', './views');
app.set('view engine', 'ejs');


mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url).then(() => {
    console.log("connect data")
}).catch(err => {
    console.log("cannot connect")
    process.exit()
})

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static(__dirname));

const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
    secret: "thisismysecrctekey",
    saveUninitialized: true,
    cookie: { maxAge: oneDay},
    resave: false
}));

app.use(cookieParser());

var session

app.get('/', (req,res) => {
    res.sendFile('views/index.html',{root:__dirname})
})

app.post('/user', async(req,res) => {
    try{
        const check = await collection.findOne({name:req.body.name})
        session = req.session
        session.name = req.body.name
        if(check.password===req.body.password){
            res.render("homepage", {data: check})
        }
        else{
            res.redirect("/")
        }
    }
    catch{
        res.redirect("/")
    }
})

app.post('/teacheruser', async(req,res) => {
    try{
        const check = await collection.findOne({name:req.body.name})
        session = req.session
        session.name = req.body.name
        if(check.password===req.body.password){
            res.render("teacherhomepage", {data: check})
        }
        else{
            res.redirect("/")
        }
    }
    catch{
        res.redirect("/")
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

app.get('/teacher', (req, res) => {
    res.sendFile('views/teacher.html',{root:__dirname})
})

app.get('/student', (req, res) => {
    res.sendFile('views/student.html',{root:__dirname})
})

app.get('/data', async(req,res) => {
    session = req.session
    const getdata = await collection.findOne({name:session.name})
    res.render("personal",{data: getdata})
})

app.get('/teacherdata', async(req,res) => {
    session = req.session
    const getdata = await collection.findOne({name:session.name})
    res.render("teacherpersonal",{data: getdata})
})

app.get('/home', async(req,res) => {
    session = req.session
    const getdata = await collection.findOne({name:session.name})
    res.render('homepage',{data: getdata})
})

app.get('/teacherhome', async(req,res) => {
    session = req.session
    const getdata = await collection.findOne({name:session.name})
    res.render('teacherhomepage',{data: getdata})
})

app.get('/grade', async(req,res) => {
    session = req.session
    if(session.name){
        const getdata = await collection.findOne({name:session.name})
        res.render('gradepage',{data: getdata})
    }
    else{
        console.log("fail")
    }
})

app.get('/gradeY1', async(req,res) => {
    session = req.session
    const getdata = await collection.findOne({name:session.name})
    res.render('gradeshow1',{data: getdata})
})

app.get('/gradeY2', async(req,res) => {
    session = req.session
    const getdata = await collection.findOne({name:session.name})
    res.render('gradeshow2',{data: getdata})
})

app.get('/gradeY3', async(req,res) => {
    session = req.session
    const getdata = await collection.findOne({name:session.name})
    res.render('gradeshow3',{data: getdata})
})

app.get('/gradeY4', async(req,res) => {
    session = req.session
    const getdata = await collection.findOne({name:session.name})
    res.render('gradeshow4',{data: getdata})
})

app.get('/gradesim', async(req,res) => {
    session = req.session
    const getdata = await collection.findOne({name:session.name})
    res.render('gradesim',{data: getdata})
})

app.get('/search', async(req,res) => {
    session = req.session
    const getdata = await collection.findOne({name:session.name})
    res.render('search',{data: getdata})
})

app.get('/teachersearch', async(req,res) => {
    session = req.session
    const getdata = await collection.findOne({name:session.name})
    res.render('teachersearch',{data: getdata})
})


app.post("/change", async(req, res) => {
    session = req.session
    // const getdata = await collection.findOne({name:session.name})
    collection.findOneAndUpdate(req.body.name, {$set: {
        name: req.body.name,
        id: req.body.id,
        password: req.body.password,
        nickname: req.body.nickname,
        email: req.body.email,
        personalemail: req.body.perssonalemail,
        tel: req.body.tel,
        line: req.body.line,
        addr: req.body.addr,
        health: req.body.health,
        food: req.body.food
    }}, {new: true})
    .then(data =>{
        if(!data){
            return res.status(404).json({
                msg: "ไม่พบ Record รหัส : " + req.body.name
            })
        }
        else{
            console.log("Update Complete")
            res.redirect("/home")
        }
    }).catch(err => {
        return res.status(500).json({
            msg: "ไม่สามารถ Update ข้อมูลได้ เนื่องจาก : " + err.message
        })
    })
})

app.post("/teacherchange", async(req, res) => {
    session = req.session
    // const getdata = await collection.findOne({name:session.name})
    collection.findOneAndUpdate(req.body.name, {$set: {
        name: req.body.name,
        id: req.body.id,
        password: req.body.password,
        nickname: req.body.nickname,
        email: req.body.email,
        personalemail: req.body.perssonalemail,
        tel: req.body.tel,
        line: req.body.line,
        addr: req.body.addr,
        health: req.body.health,
        food: req.body.food
    }}, {new: true})
    .then(data =>{
        if(!data){
            return res.status(404).json({
                msg: "ไม่พบ Record รหัส : " + req.body.name
            })
        }
        else{
            console.log("Update Complete")
            res.redirect("/home")
        }
    }).catch(err => {
        return res.status(500).json({
            msg: "ไม่สามารถ Update ข้อมูลได้ เนื่องจาก : " + err.message
        })
    })
})
app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));