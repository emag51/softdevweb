app.post("/login", async (req,res)=>{

    try{
        const check = await collection.findOne({email:req.body.email})
        if(check.password === req.body.password){
            res.render("home", {user: check})

        }else{
            res.render("login", {error: "password is wrong"}) 
        }

    }
    catch{
        res.render("login", {error: "Invalid username/password combination"})
        //res.send("wrong detail")
    }

    })