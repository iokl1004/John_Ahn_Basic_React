const mongoose = require('mongoose');

const userSchma = mongoose.Schema({
    name: {
        type : String,
        maxlength: 50
    },
    email: {
        type : String,
        trim: true, // space를 없애주는 역할을 함.
        unique:1
    },
    password: {
        type : String,
        minlength : 5
    },
    lastname: {
        type : String,
        maxlength : 50
    },
    role: {
        type : Number,
        default: 0  // 임의로 롤을 지정하지 않을경우 0값 입력
    },
    image: String,
    token :{        // 유효성 검사를 할 수 있음.
        type : String
    },
    tokenExp: {
        type : Number
    }
})

const User = mongoose.model('User', userSchma)
module.exports = { User }