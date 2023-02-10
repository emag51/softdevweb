const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const app = express();
const PORT = 3500;

app.set('views', './views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


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
        // res.sendFile('views/index.html',{root:__dirname})
    }
});

app.post('/user', (req,res) => {
    if(req.body.username == myusername && req.body.password == mypassword){
        session=req.session;
        session.userid=req.body.username;
        console.log(req.session)
        // res.send(`Hello, welcome <a href=\'/logout'>click to logout</a>`);
        res.render('homepage.html');
        // res.sendFile('../views/homepage.html', {root:__dirname})
    }
    else{
        res.send('Invalid username or password');
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.get('*', (req, res) => {
    // res.send('ไม่พบหน้าที่คุณร้องขอ (Error: 404 Page Not Found)')
    // res.sendFile('views/erorr.html',{root:__dirname})
    res.render('erorr.html');
})

// app.post('/data', (req,res) => {
//     res.render('peronal.html');
// })

app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));