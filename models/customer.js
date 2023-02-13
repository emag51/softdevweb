const mongoose = require('mongoose')

const CustomerSchema = mongoose.Schema(
    {
        id: String,
        password: String,
        name:   String,
        THname:    String
        // sirapaop
        // id:{
        //     type: String,
        //     required: true
        // },
        // password:{
        //     type: String,
        //     required: true
        // },
        // name:{
        //     type: String,
        //     required: true
        // },
        // THname:{
        //     type: String,
        //     required: true
        // }
    },
    {
        versionKey: false
    }
)

module.exports = mongoose.model('username',CustomerSchema)
