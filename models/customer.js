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
    nickname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    personalemail:{
        type:String,
        required:true
    },
    tel:{
        type:String,
        required:true
    },
    line:{
        type:String,
        required:true
    },
    addr:{
        type:String,
        required:true
    },
    food:{
        type:String,
        required:true
    },
    health:{
        type:String,
        required:true
    },
    year1sub1:{
        type:Array,
        required:true
    },
    year1sub2:{
        type:Array,
        required:true
    },
    year2sub1:{
        type:Array,
        required:true
    },
    year2sub2:{
        type:Array,
        required:true
    },
    year3sub1:{
        type:Array,
        required:true
    },
    year3sub2:{
        type:Array,
        required:true
    },
    year4sub1:{
        type:Array,
        required:true
    },
    year4sub2:{
        type:Array,
        required:true
    },
    gpax:{
        type:String,
        required:true
    }
}
)

module.exports = mongoose.model('user',CustomerSchema)