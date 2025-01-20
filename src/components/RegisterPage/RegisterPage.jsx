import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { toast } from "react-toastify";
import bg from '../../assets/img/9082953.jpg'
import registerLotiie from '../../assets/lottie/Animation - 1737369302762.json'
import { Link, useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
const RegisterPage = () => {

    const location = useLocation();
    const { createNewUser, setUser } = useContext(AuthContext)
    const navigate = useNavigate();

    const handleRegister = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const name = e.target.name.value;
        const password = e.target.password.value;

        console.log(name)
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;

        if (!regex.test(password)) {

            toast.error('Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one special character.');



            return;

        }
        createNewUser(email, password)
            .then(result => {
                const registeredUser = result.user;

                setUser(registeredUser)
                toast.success('User Registered successfully')
                navigate(location?.state ? location.state : '/')
                console.log(registeredUser)



            })
            .catch(err => {

                toast.error(err.message)

            })

    }
    return (
        <div className='p-10 mt-28 mb-20 h-full' style={{
            backgroundImage: `url(${bg})`,

            width: "full",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
        }}>

            <div style={{
                boxShadow: "6px 6px 10px rgba(0, 0, 0, 0.3)", // Bottom-right shadow

            }} className='md:flex bg-white justify-between gap-14 border-4  '>
                <div className='w-3/12 mx-auto'>

                    <div className='md:pt-36 pt-5'>
                        <Lottie animationData={registerLotiie} loop={true} />
                    </div>




                </div>
                <div className='md:w-2/4 mx-auto '>
                    <h1 className='text-center font-bold text-xl md:text-5xl pt-12'>Register</h1>
                    <div className=''>
                        <form onSubmit={handleRegister} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl ">Name</span>
                                </label>
                                <input type="text" name='name' placeholder="name" className=" input input-bordered" required />
                            </div>
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




                            </div>


                            <div className="form-control mt-6">
                                <button className="btn btn-primary border-none bg-[#2c3792] text-white text-xl ">Register</button>
                            </div>
                        </form>
                    </div>
                    <div className='flex justify-center   mx-auto'>
                        <h1 className=' text-base mb-4'>Already have account? <Link to='/login' className='underline text-[#2c3792]'>Login Now</Link> </h1>
                    </div>

                </div>

            </div>


        </div>
    );
};

export default RegisterPage;