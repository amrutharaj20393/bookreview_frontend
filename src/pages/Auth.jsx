import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { LoginApi, registerApi } from '../services/allApi';


function Auth({ register }) {

    const [showpassword, setShowpassword] = useState(false)
    const [errorUser, setErroruser] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPass, setErrorPass] = useState("");

    const [userdetails, setUserDetails] = useState({
        username: "",
        email: "",
        password: ""
    })
    //console.log(userdetails)
    const navigate = useNavigate()


    const validateUsername = (value) => {
        if (!value.trim()) {
            return "Username is required";
        }
        if (value.length < 3) {
            return "Username must be at least 3 characters long";
        }
        if (!!value.match('^[a-zA-Z]*$')) {
            return "";
        }
        else {
            return "Username can only contain letters, numbers, and underscores";
        }

    };
    const validateEmail = (value) => {
        if (!value.trim()) {
            return "Email is required";
        }
        if (value.length < 3) {
            return "email must be at least 3 characters long";
        }
        if (!!value.match('^[a-z0-9@.]*$')) {
            return "";
        }
        else {
            return "email can only contain letters, numbers,special charactors";
        }

    };

    const validatePassword = (value) => {
        if (!value.trim()) {
            return "password is required";
        }
        if (value.length < 6) {
            return "password must be at least 6 characters long";
        }
        if (!!value.match('^[a-zA-Z0-9]*$')) {
            return "";
        }
        else {
            return "password can only contain letters, numbers,special charactors";
        }

    };


    const handleChange = (e) => {
        const value = e.target.value;
        setUserDetails({ ...userdetails, username: value });
        setErroruser(validateUsername(value));
    };
    const handleChangeemail = (e) => {
        const value = e.target.value;
        setUserDetails({ ...userdetails, email: value });
        setErrorEmail(validateEmail(value));
    };
    const handleChangePassword = (e) => {
        const value = e.target.value;
        setUserDetails({ ...userdetails, password: value });
        setErrorPass(validatePassword(value));
    };



    const handleRegister = async () => {
        //  console.log("inside register")
        // console.log(userdetails)
        const { username, email, password } = userdetails
        if (!username || !email || !password) {
            toast.info("Please fill all details")
        }
        else {
            //  console.log(errorEmail)
            if (errorEmail == "" && errorPass == "" && errorUser == "") {
                const result = await registerApi({ username, email, password })
                if (result.status == 200) {
                    toast.success("Register Sucessfully")


                    setTimeout(() => {

                        navigate('/login')
                    }, 2500)

                    // navigate('/login')
                }
                else if (result.status == 409) {
                    toast.warning(result.response.data)
                    setUserDetails({
                        username: "",
                        email: "",
                        password: ""
                    })
                }
                else {
                    toast.error("something went wrong")
                    setUserDetails({
                        username: "",
                        email: "",
                        password: ""
                    })
                }

            }

        }
    }
    const handleLogin = async () => {
        const { email, password } = userdetails
        if (!email || !password) {
            toast.info("please complete details")
        }
        else {
            const result = await LoginApi({ email, password })
            //console.log(result)
            if (result.status == 200) {
                toast.success("Login Sucessfully")
                sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
                sessionStorage.setItem("token", result.data.token)
                navigate('/')

            }
            else if (result.status == 401) {
                toast.warning(result.response.data)
                setUserDetails({
                    username: "",
                    email: "",
                    password: ""
                })
            }
            else if (result.status == 404) {
                toast.warning('Account does not exist...')
                setUserDetails({
                    username: "",
                    email: "",
                    password: ""
                })
            }
            else {
                toast.error("something went wrong")
                setUserDetails({
                    username: "",
                    email: "",
                    password: ""
                })
            }
        }

    }

    return (
        <>
            <div id="login" className='flex justify-center items-center'>


                <div className='md:grid grid-cols-3 w-full'>
                    <div></div>
                    <div className='flex justify-center items-center flex-col p-2'>
                        <h3 className='text-3xl mb-5 font-bold '>BOOK STORE</h3>
                        <form className='w-full bg-gray-600 p-10 flex justify-center items-center flex-col' action="">

                            <div style={{ width: '70px', height: '70px', borderRadius: '50%' }} className='border border-amber-50'>
                                <FontAwesomeIcon icon={faUser} className='text-white ms-5 mt-4 fa-2x' />
                            </div>
                            {!register ? <h1 className='text-white mt-5 mb-8 text-3xl'>Login</h1>
                                : <h1 className='text-white mt-5 mb-8 text-3xl'>Register</h1>}

                            {register && <div className='mb-5 w-full mt-8'>
                                <input name="username" type="text" placeholder='Username' className={`p-2 rounded w-full border-2 ${errorUser ? "border-red-500" : "border-white text-white"}`}
                                    onChange={handleChange} />
                                {errorUser && <p className="text-red-500 text-sm mt-1">{errorUser}</p>}
                            </div>}

                            <div className='mb-5 w-full '>
                                <input name="email" type="text" placeholder='Email Id' className={`p-2 rounded w-full border-2 ${errorEmail ? "border-red-500" : "border-white text-white"}`}
                                    onChange={handleChangeemail} />
                                {errorEmail && <p className="text-red-500 text-sm mt-1">{errorEmail}</p>}
                            </div>

                            <div className='mb-2 w-full flex  '>

                                <input name="password" type={showpassword ? "text" : "password"} placeholder='Password' className={`p-2 rounded w-full border-2 ${errorPass ? "border-red-500" : "border-white text-white"}`}
                                    onChange={handleChangePassword} />

                                {!showpassword ? <FontAwesomeIcon icon={faEyeSlash} onClick={() => setShowpassword(true)} style={{ marginTop: '11px', marginLeft: '30px' }} className='me-2  rounded-4xl border border-white' /> : <FontAwesomeIcon icon={faEye} onClick={() => setShowpassword(false)} style={{ marginTop: '11px', marginLeft: '30px' }} className='me-2 rounded-4xl  border border-white' />}

                            </div>
                            {errorPass && <p className="text-red-500 text-sm mt-1">{errorPass}</p>}




                            <div className='mb-5 w-full flex justify-between '>
                                <p className='text-amber-400 mt-2 ' style={{ fontSize: '10px' }}>"Never share password with others"</p>

                                {!register && <p className='text-white underline' style={{ fontSize: '10px' }}>Forgot password</p>}
                            </div>

                            {register ? <div className='w-full mb-2'>
                                <button type='button' className='bg-green-800 text-white w-full p-3 rounded' onClick={handleRegister}>Register</button>
                            </div> :
                                <div className='w-full mb-2'>
                                    <button type='button' onClick={handleLogin} className='bg-green-800 text-white w-full p-3 rounded'>Login</button>
                                </div>}
                            {!register && <p className='text-white'>----------------or-------------</p>
                            }


                            {register ? <p className='text-white'>Are you a already a user? <Link to={'/login'} className='text-blue-900 underline ms-2 font-bold'>Login</Link></p> :
                                <p className='text-white'>Are you a New user? <Link className='text-blue-900 underline ms-2 font-bold' to={'/register'}>Register</Link></p>}
                        </form>
                    </div>
                    <div></div>
                </div>

            </div>
            <ToastContainer theme='colored' position='top-center' autoClose={2000} />
        </>
    )
}

export default Auth
