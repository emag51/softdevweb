const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },


    sub1:{
        type:String,
        required:true
    },
    credit1:{
        type:String,
        required:true
    },
    grade1:{
        type:String,
        required:true
    },


    sub2:{
        type:String,
        required:true
    },
    credit2:{
        type:String,
        required:true
    },
    grade2:{
        type:String,
        required:true
    },


    sub3:{
        type:String,
        required:true
    },
    credit3:{
        type:String,
        required:true
    },
    grade3:{
        type:String,
        required:true
    }
}
)

module.exports = mongoose.model('user',CustomerSchema)