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

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static(__dirname));

app.use(cookieParser());

app.get('/', (req,res) => {
    res.sendFile('views/index.html',{root:__dirname})
});

app.post('/user', async(req,res) => {

    try{
        const check = await collection.findOne({name:req.body.name})

        if(check.password===req.body.password){
            res.render("homepage", {data: check})

            app.get('/data', (req,res) => {
                res.render("personal",{data: check})
            })

            app.get('/home', (req,res) => {
                res.render('homepage',{data: check})
            })

            app.get('/grade', (req,res) => {
                res.render('gradepage',{data: check})
            })
            
            app.get('/gradeY1', (req,res) => {
                res.render('gradeshow1',{data: check})
            })

            app.get('/gradeY2', (req,res) => {
                res.render('gradeshow2',{data: check})
            })

            app.get('/gradeY3', (req,res) => {
                res.render('gradeshow3',{data: check})
            })

            app.get('/gradeY4', (req,res) => {
                res.render('gradeshow4',{data: check})
            })

            app.get('/gradesim', (req,res) => {
                res.render('gradesim',{data: check})
            })


        }
        else{
            res.send("wrong password")
        }
    }
    catch{
        res.send("wrong detail")
    }
})

app.get('/logout', (req, res) => {
    req.destroy('index.html');
    res.redirect('/');
    res.render('index.html');
});

// app.get('*', (req, res) => {
//     // res.send('ไม่พบหน้าที่คุณร้องขอ (Error: 404 Page Not Found)')
//     // res.sendFile('views/erorr.html',{root:__dirname})
//     res.render('erorr.html');
// })
app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));