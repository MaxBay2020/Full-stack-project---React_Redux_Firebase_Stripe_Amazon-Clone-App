import React, {useState} from 'react'
import '../styles/Login.css'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import { useDispatch } from 'react-redux'
import {
    login
} from '../features/user'

import {useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie'

const Login = () => {
    // connect to firestore
    const auth = getAuth()

    const [user, setUser] = useState({})

    const dispatch = useDispatch()
    const navigate = useNavigate()


    // cookies
   const [cookies, setCookie] = useCookies()


    // get user info
    const handleUserInfo = (e) => {
        const {name, value} = e.target

        setUser({
            ...user,
            [name]: value
        })
    }

    // login user
    const handleLogin = async (e) => {
        e.preventDefault()
        try{
            const credential = await signInWithEmailAndPassword(auth, user.email, user.password)
            const { user:{email} } = credential
            dispatch(login({email}))
            // save user to cookie
            setCookie('user', credential.user.email, {
                maxAge: 60 * 60 * 24 // 储存1天
            })
            navigate('/')
        }catch(err){
            toast.error(err.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,

            })
        }
    }

    // register
    const handleRegisterUser = async (e) => {
        e.preventDefault()
        try {
            const credential = await createUserWithEmailAndPassword(auth, user.email, user.password)
            const { user:{email} } = credential
            dispatch(login({email}))
            // save user to cookie
            setCookie('user', credential.user.email, {
                maxAge: 60 * 60 * 24 // 储存1天
            })
            navigate('/')
        }catch(err){
            toast.error(err.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,

            })
        }

    }





    return (
        <div className='login'>
            <img
                className='login-logo'
                src="https://washington3pl.com/wp-content/uploads/2021/10/amazon.png"
                alt="amazon-logo"/>
            <form className='login-form' onSubmit={(e)=>handleLogin(e)}>
                <ToastContainer
                    position="top-center"
                    style={{zIndex: 99999, marginTop: '60px', fontSize: '1.8rem'}}
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <h2>Sign In</h2>
                <label htmlFor="login-email">Email: </label>
                <input
                    id='login-email'
                    type="email"
                    placeholder="Please enter your email"
                    name='email'
                    onChange={(e)=>handleUserInfo(e)}
                />

                <label htmlFor="login-password">Password: </label>
                <input
                    id='login-password'
                    type="password"
                    placeholder="Please enter your password"
                    name='password'
                    onChange={(e)=>handleUserInfo(e)}
                />

                <input className='login-btn' type="submit" value='Sign In'/>
                <p className='login-register'>Does not have an account? <a href='#' onClick={(e)=>handleRegisterUser(e)} style={{textDecoration: 'none' }}><span className='register-link'>Register Now</span></a></p>
            </form>

        </div>
    );
};

export default Login;
