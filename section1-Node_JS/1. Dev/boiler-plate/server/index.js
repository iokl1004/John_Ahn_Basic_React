const express = require('express')	// express 모듈을 가져온다!
const app = express()			    // 새로운 익스프레스 app을 만든다!
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');  // 쿠키에 저장
const config = require("./server/config/key");
const { auth } = require("./server/middleware/auth");
const { User } = require("./server/models/User");  // User정보를 가져온다!

// 바디파서가 클라이언트에서 오는 정보를 서버에서 분석해서 가져오게 해준다.
// application/x-www-form-urlencoded    이 데이터를 분석해서 가지고 올 수 있게 해준다.
app.use(bodyParser.urlencoded({extended: true}));

// application/json 을 분석해서 가지고 올 수 있게 해준것이다.
app.use(bodyParser.json());
app.use(cookieParser());    // 쿠키파서 사용!

// Mongoose 설정
const mongoose = require('mongoose')
// mongoose 6버전 미만
// mongoose.connect('mongodb+srv://iokl1004:doslzhf123@boilerplate.sepbw.mongodb.net/?retryWrites=true&w=majority&appName=boilerplate', {
//     useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false
// }).then(() => console.log('MongoDB Connected..'))

// mongoose 6버전 이상 (mongoose 6버전 이상에선 더이상 useNewUrlParser, useUnifiedTopology, useFindAndModify, useCreateIndex 요 친구들을 지원하지 않음)
mongoose.connect(config.mongoURI)
.then(() => console.log('MongoDB Connected..'))
.catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!~~ 안녕하세요~'))	// root 디렉토리에 오면 Hello World를 출력 되게끔 해준다!

app.get('/api/hello', (req, res) => {
    res.send("안녕하세요~");
})

app.post('/api/users/register', async (req, res) => {
    // 회원가입 할 때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터 베이스에 넣어준다.

    // User 인스턴스 생성
    const user = new User(req.body)

    const result = await user.save().then(()=> {
        res.status(200).json({
            success: true
        })
    }).catch((err) => {
        res.json({ success : false, err})
    })
})

app.post('/api/users/login', async (req, res) => {
    try {
        const user = await User.User.findOne({ email : req.body.email })
        if(!user) {
            return res.json({
                loginSuccess : false,
                message : "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }

        const isMatch = await user. user.comparePassword(req.body.password)
        console.log(isMatch)
        if(!isMatch) {
            return res.json({ loginSuccess : false, message:"비밀번호가 틀렸습니다." })
        }
        const token = await user.generateToken()
        res.cookie("user_auth", token).status(200).json({ loginSuccess: true, userId: user._id })
    } catch (err) {
        return res.status(400).send(err)
    }
})

// role 1 어드민 role 2 특정 부서 어드민
// role 0 -> 일반유저   role 0이 아니면 관리자

// auth 라는 미들웨어 추가!
// 콜백펑션 넘겨주기 전에 중간에 무언가를 한다!
app.get('/api/users/auth', auth, (req, res) => {
    // 여기 까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 True 라는 말.
    res.status(200).json({
        _id : req.user._id,
        isAdmin: req.user.role === 0? false : true,
        isAuth : true,
        email: req.user.email,
        name : req.user.name,
        lastname : req.user.lastname,
        role : req.user.role,
        image: req.user.image
    })
})

app.get('/api/users/logout', auth, (req, res) => {
    console.log('req.user', req.user);
    User.findOneAndUpdate( { _id : req.user._id }, 
        { token : "" }
        , (err, user) => {
            if(err) return res.json({ success : false, err });
            return res.status(200).send({
                success : true
            })
        })
})

const port = 5000				    // port는 아무렇게 4000번해도 되고, 5000번으로 해도된다!

app.listen(port, () => console.log(`Example app listening on port ${port}!`))	// 5000번 포트에서 해당 앱을 실행하게끔 해주는 것이다!