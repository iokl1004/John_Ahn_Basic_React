// 환경변수
// Local 환경인경우 development
// Deploy(배포) 한 후에는 production 이라고 나옴
if(process.env.NODE_ENV === 'production') {
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}