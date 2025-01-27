import React, { useState } from 'react'
import Axios from 'axios'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

function LoginPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value)
  }

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value)
  }

  const onSubmitHandler = (e) => {
    e.preventDefault(); // 리프레시를 방지한다!

    let body = {
      email : Email,
      password : Password
    }

    dispatch(loginUser(body))
        .then(response => {
          if(response.payload.loginSuccess) {
            props.history.push('/')
          } else {
            alert('Error')
          }
        })


  }

  return (
    <div style={{
        display: 'flex', justifyContent : 'center', alignItems : 'center'
        , width : '100%', height : '100vh'
    }}>
        <form style= {{ display : 'flex', flexDirection : 'column' }}
              onSubmit={onSubmitHandler}
        >
          <label>Email</label>
          <input type="email" value={Email} onChange={onEmailHandler} />
          <label>Password</label>
          <input type="Password" value={Password} onChange={onPasswordHandler} />
          <br />
          <button type="submit">
            Login
          </button>
        </form>
    </div>
  )
}

export default withRouter(LoginPage)