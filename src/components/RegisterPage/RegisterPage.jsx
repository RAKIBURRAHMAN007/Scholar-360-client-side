import { useContext } from "react";
import { auth, AuthContext } from "../../provider/AuthProvider";
import { toast } from "react-toastify";
import bg from '../../assets/img/9082953.jpg'
import registerLotiie from '../../assets/lottie/Animation - 1737369302762.json'
import { Link, useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import UseAxiosPublic from "../../hooks/UseAxiosPublic";
import { updateProfile } from "firebase/auth";
const imgHostingKey = import.meta.env.VITE_imgHostingKey;
const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`
const RegisterPage = () => {
    const axiosPublic = UseAxiosPublic();
    const location = useLocation();
    const { createNewUser, setUser } = useContext(AuthContext)
    const navigate = useNavigate();

    
    const handleRegister = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const name = e.target.name.value;
        const password = e.target.password.value;
        const imageFile = e.target.image.files[0]; 

        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;

        if (!regex.test(password)) {
            toast.error('Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one special character.');
            return;
        }

        try {
         
            const formData = new FormData();
            formData.append('image', imageFile);

    
            const imgResponse = await axiosPublic.post(imgHostingApi, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (imgResponse.data.success) {
                const imageUrl = imgResponse.data.data.display_url;

                const result = await createNewUser(email, password);
                const registeredUser = result.user;
                const profile = {
                    displayName: name,
                    photoURL: imageUrl

                }
                const userInfo = {
                    displayName: name,
                    email: email

                }

                updateProfile(auth.currentUser, profile)
                    .then(() => {
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    toast.success('User Registered Successfully')

                                }
                            })
                    })

                setUser({
                    ...registeredUser,
                    name,
                    photoURL: imageUrl, 
                });

                
                navigate(location?.state ? location.state : '/');
            } else {
                throw new Error('Image upload failed');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message || 'Something went wrong');
        }
    };

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
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl">Profile Image</span>
                                </label>
                                <input
                                    type="file"
                                    name="image"

                                    className="file-input file-input-bordered"
                                    required
                                />
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