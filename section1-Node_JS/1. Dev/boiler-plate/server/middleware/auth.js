const { User } = require('../models/User');

let auth = (req, res, next) => {

    // 인증 처리를 하는곳

    // 클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookie.x_auth;

    // 토큰을 복호화 한 후, 유저를 찾는다.
    User.findByToekn(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({ isAuth : false, error: true})

        req.token = token;
        req.user = user;
        next();
    });

    // 유저가 있을경우 인증 Okay

    // 유저가 없을경우 인증 NO!
}

module.exports = { auth };