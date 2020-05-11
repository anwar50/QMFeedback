import axios from 'axios';
import * as actionTypes from './actionTypes';
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
export const authSuccess = (token, username, signup) => {
    console.log(username)
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        username: username,
        signup: signup
    }
}
export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    window.location = '/login';
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}
export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}
export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/rest-auth/login/', {
            username: username,
            password: password
        })
        .then(res => {
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600 * 10000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token, username));
            dispatch(checkAuthTimeout(3600));
            //this.props.history.push(`/savedtests/` + username + '/');
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}
export const authProfile = (type, username, avatar) => {
    let user_data = []
    axios.get(`http://127.0.0.1:8000/api/users`)
        .then(res => {
            user_data = res.data
            user_data.map(function(item, i){
                if(item.username == username){
                    console.log(item.id)
                    axios.post(`http://127.0.0.1:8000/api/profile/`, {
                        user: item.id,
                        department: 'EECS COMPUTER SCIENCE',
                        user_type: type, 
                        avatar: avatar
                    })
                    .then(res => {
                        console.log(res)
                        window.location = '/login';
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
            })
            console.log(user_data)
        })
}
export const authSignup = (username, email, password1, password2, avatar) => {
    return dispatch => {
        let teacher = ''
        console.log(avatar.props.src)
        console.log(username)
        console.log(password2)
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/rest-auth/registration/', {
            username: username,
            email: email,
            password1: password1,
            password2: password2,
        })
        .then(res => {
            const token = res.data.key;
            const signup = "true"
            const expirationDate = new Date(new Date().getTime() + 3600 * 10000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token, signup));
            dispatch(checkAuthTimeout(3600));
            teacher = 'Teacher'
            dispatch(authProfile(teacher, username, avatar.props.src))
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === undefined) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if ( expirationDate <= new Date() ) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000) );
            }
        }
    }
}