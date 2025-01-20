import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import GoogleButton from 'react-google-button'
import loginLotiie from '../../assets/lottie/Animation - 1737369005126.json'
import Lottie from 'lottie-react';
import bg from '../../assets/img/9082953.jpg'
import { toast } from 'react-toastify';
import UseAxiosPublic from '../../hooks/UseAxiosPublic';
const LoginPage = () => {


    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = UseAxiosPublic();
    const { userLogin, setUser, googleSignIn } = useContext(AuthContext);


    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const userInfo = {
                    email: result.user?.email,
                    displayName: result.user?.displayName
                }
                // console.log('rsult', result)

                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data)

                        toast.success('Login Successful');

                navigate(location?.state ? location.state : '/')

                    })



            })



    }


    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        userLogin(email, password)
            .then(result => {
                const user = result.user;
                toast.success("Login Successful")
                setUser(user);
                navigate(location?.state ? location.state : '/')
            })
            .catch(err => {


                toast.error(err.message)


            })

    }
    return (
        <div className='p-10 mt-28 lg:mb-24 mb-16 h-full' style={{
            backgroundImage: `url(${bg})`,
            

            width: "full",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            
        }}>

            <div style={{
                boxShadow: "6px 6px 10px rgba(0, 0, 0, 0.3)", // Bottom-right shadow

            }} className='md:flex justify-between bg-white gap-14 border-4  '>
                <div className='w-3/12 mx-auto'>

                    <div className='md:pt-36 pt-5'>
                        <Lottie animationData={loginLotiie} loop={true} />
                    </div>




                </div>
                <div className='md:w-2/4 mx-auto '>
                    <h1 className='text-center font-bold text-xl md:text-5xl pt-12'>Login</h1>
                    <div className=''>
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl ">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className=" input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl ">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className=" input input-bordered" required />


                                <label className="label">
                                    <span
                                        className="label-text-alt  link link-hover text-xl cursor-pointer"
                                    // onClick={() => {
                                    //     const email = emailRef.current.value;
                                    //     navigate('/forgetPassword', { state: { email } });
                                    // }}
                                    >
                                        Forgot password?
                                    </span>
                                </label>

                            </div>


                            <div className="form-control mt-6">
                                <button className="btn btn-primary border-none bg-[#2c3792] text-white text-xl ">Login</button>
                            </div>
                        </form>
                    </div>
                    <div className='flex justify-center  mx-auto'>
                        <h1 className=' text-base'>New to Scholar 360? <Link to='/register' className='underline text-[#2c3792]'>Register Now</Link> </h1>
                    </div>
                    <div className='flex justify-center mt-2 mb-4'>
                        <GoogleButton
                            onClick={handleGoogleSignIn}
                        />
                    </div>
                </div>

            </div>


        </div>
    );
};

export default LoginPage;