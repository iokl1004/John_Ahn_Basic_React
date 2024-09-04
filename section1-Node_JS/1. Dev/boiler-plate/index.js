const express = require('express')	// express 모듈을 가져온다!
const app = express()			    // 새로운 익스프레스 app을 만든다!
const port = 5000				    // port는 아무렇게 4000번해도 되고, 5000번으로 해도된다!

// Mongoose 설정
const mongoose = require('mongoose')
// mongoose 6버전 미만
// mongoose.connect('mongodb+srv://iokl1004:doslzhf123@boilerplate.sepbw.mongodb.net/?retryWrites=true&w=majority&appName=boilerplate', {
//     useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false
// }).then(() => console.log('MongoDB Connected..'))

// mongoose 6버전 이상 (mongoose 6버전 이상에선 더이상 useNewUrlParser, useUnifiedTopology, useFindAndModify, useCreateIndex 요 친구들을 지원하지 않음)
mongoose.connect('mongodb+srv://iokl1004:doslzhf123@boilerplate.sepbw.mongodb.net/?retryWrites=true&w=majority&appName=boilerplate')
.then(() => console.log('MongoDB Connected..'))
.catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!~~ 안녕하세요~'))	// root 디렉토리에 오면 Hello World를 출력 되게끔 해준다!

app.listen(port, () => console.log(`Example app listening on port ${port}!`))	// 5000번 포트에서 해당 앱을 실행하게끔 해주는 것이다!