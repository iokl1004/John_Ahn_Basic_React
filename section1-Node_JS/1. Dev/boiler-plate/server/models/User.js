const mongoose = require('mongoose');

// 비밀번호 암호화!
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
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

userSchema.pre('save', function( next ){
    var user = this;

    // password가 변경 될때만 아래의 구문 실행!
    if(user.isModified('password')) {
        // 비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)

            // 첫번째 아규먼트 값은 PlainPassword
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)

                // 암호 비밀번호를 만드는데 성공했다면?!
                user.password = hash
                next()
            })
        })
    } else {        // 비밀번호를 변경하는것이 아닌경우
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    
    // plainPassword 1234567    암호화된 비밀번호
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err),
        cb(null, isMatch)
    })
}

// 토큰생성!
userSchema.methods.generateToken = function(cb) {
    var user = this;
    console.log('user._id', user._id)

    // jsonwebtoken을 이용해서 token을 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token
    user.save(function (err, user) {
        if(err) return cb(err)
        cb(null, user)  // err는 없고 유저정보만 전달!
    })
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    // user._id + '' = token

    // 토큰을 decode 한다.
    jwt.verify(token, 'secretToken', function (err, decoded) {
        // 유저 ID를 이용해서 유저를 찾은 다음에
        // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

        user.findOne({"_id" :" decoded", "token": token }, function(err, user){
            if(err) return cb(err);
            cb(null, user)
        })
    })

    jwt.verify(token, 'shhhh', function(err, decoded) {
        console.log(decoded.foo)    // bar
    }) 
}


const User = mongoose.model('User', userSchema)

module.exports = { User }