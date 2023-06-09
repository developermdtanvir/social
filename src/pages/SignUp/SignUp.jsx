import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineGoogle } from 'react-icons/ai';
import { FaGithub } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import loginImage from '../../../src/assets/login/Illustration.svg';
import { AuthContext } from '../../providers/AuthProvider';
import './SignUp.css';

function SignUp() {
    const { createUserEmailPass, updateName, loginWithGoogle, loginWithGithub } = useContext(AuthContext)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/'

    const handleSignUp = (data) => {
        const { email, password, name } = data;
        createUserEmailPass(email, password)
            .then(res => {
                updateName(name).then(
                    res => {
                        Swal.fire(
                            'user created successfully!',
                            'You clicked the button!',
                            'success'
                        )
                        navigate(from, { replace: true })
                    }
                )
            })
    }


    const handleLoginGoogle = () => {
        loginWithGoogle()
            .then(res => {
                navigate(from, { replace: true });
            })
    }

    const handleLoginGithub = () => {
        loginWithGithub()
            .then(res => {
                navigate(from, { replace: true });
            })
    }

    return (
        <div className=' background-image'>
            <div className="hero min-h-screen ">
                <div className="hero-content flex-col-reverse lg:flex-row">
                    <div className="text-center ">
                        <img src={loginImage} alt="" />
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm ">
                        <h1 className='hidden lg:flex justify-center items-center text-4xl text-black font-bold'>Sign up</h1>
                        <form onSubmit={handleSubmit(handleSignUp)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input {...register('name', { required: true })} type="text" placeholder="name" className="input input-bordered " />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register('email', {
                                    pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, required: true
                                })} type="email" placeholder="email" className="input input-bordered " />
                                {errors.email?.type === 'pattern' && <p className=' text-red-700' role="alert">Wrong Email Address</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register('password', {
                                    pattern: /^[a-zA-Z0-9!@#$%^&*]{6,16}$/, required: true
                                })} type="password" placeholder="password" className="input " />
                                {errors.password?.type === 'pattern' && <p className=' text-red-700' role="alert">Password minumum 6 and maximum 16 chrecter</p>}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-[#D1A054] text-white">Sign up</button>
                            </div>
                        </form>
                        <div className='text-center'>
                            <p className=' text-gray-400'>Or sign in with</p>
                            <br />
                            <div className="flex justify-around items-center">
                                <FaGithub onClick={handleLoginGithub} className="text-4xl text-gray-500 border-gray-500 cursor-pointer border-2 rounded-full" />
                                <AiOutlineGoogle onClick={handleLoginGoogle} className="text-4xl text-gray-500 border-gray-500 cursor-pointer border-2 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;