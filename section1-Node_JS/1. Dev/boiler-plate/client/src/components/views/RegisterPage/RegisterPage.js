import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("")
  const [Name, setName] = useState("")
  const [Password, setPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value)
  }

  const onNameHandler = (e) => {
    setName(e.currentTarget.value)
  }

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value)
  }

  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.currentTarget.value)
  }

  const onSubmitHandler = (e) => {
    e.preventDefault(); // 리프레시를 방지한다!

    if(Password !== ConfirmPassword){
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
    }

    let body = {
      email : Email,
      name : Name,
      password : Password
    }

    // Redux 사용으로 인한 주석!
    // Axios.post('/api/users/register', body)

    dispatch(registerUser(body))
        .then(response => {
          if(response.payload.success) {
            props.history.push("/login")
          } else {
            alert("Failed to sign up")
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

          <label>name</label>
          <input type="text" value={Name} onChange={onNameHandler} />

          <label>Password</label>
          <input type="Password" value={Password} onChange={onPasswordHandler} />

          <label>Confirm Password</label>
          <input type="Password" value={ConfirmPassword} onChange={setConfirmPassword} />
          
          <button type="submit">
            회원 가입
          </button>
        </form>
    </div>
  )
}

export default withRouter(RegisterPage);