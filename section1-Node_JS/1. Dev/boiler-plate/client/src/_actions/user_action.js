import Axios from "axios";
import {
      LOGIN_USER
    , REGISTER_USER 
} from './types';

export function loginUser(dataTosubmit) {
    // 백엔드에서 가져온 데이터
    const request = Axios.post('/api/users/login', dataTosubmit)
    .then(response => response.data )

    return {
        type : LOGIN_USER,
        payload : request

    }
}

export function registerUser(dataTosubmit) {
    // 백엔드에서 가져온 데이터
    const request = Axios.post('/api/users/register', dataTosubmit)
    .then(response => response.data )

    return {
        type : REGISTER_USER,
        payload : request

    }
}