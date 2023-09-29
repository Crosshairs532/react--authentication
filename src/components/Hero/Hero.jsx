import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import auth from "../../firebase.config";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
const Hero = () => {


    const [regError, setError] = useState('')
    const [success, setSuccess] = useState('')
    // now i will try toggling in showing password
    const [tg, setTg] = useState(true)
    const [txt, setTxt] = useState('password')
    const handletoggle = val => {
        if (val) {
            setTxt('password');

            setTg(val)
        }
        else {
            setTxt('text');
            setTg(val)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        // const accepted = e.target.terms.checked;
        setError('')
        setSuccess('')
        if (!/[A-Z]/.test(password)) {
            setError('your pass should include an uppercase')
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(rslt => {
                console.log(rslt)
                setSuccess('successfully addeed')
                sendEmailVerification(rslt.user)
                    .then(() => alert('please varify your email'))
                    .catch(error => console.log(error.message))

            })
            .catch(error => {
                console.log(error)
                setError(error.message)
            })
    };


    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Register now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="text" placeholder="email" name='email' className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input className=" mb-3 w-full p-3" type={`${txt}`} name="password" id="" placeholder="enter password...." className="input input-bordered" />
                                    <span onClick={() => handletoggle(!tg)} >{tg ? <AiFillEyeInvisible></AiFillEyeInvisible> : <AiFillEye></AiFillEye>} </span>

                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Login</button>
                                </div>
                            </form>
                            {
                                regError && <p>{regError}</p>
                            }
                            {
                                success && <p>{success}</p>
                            }
                        </div>
                    </div>
                </div>
            </div >

        </div >
    );
};

export default Hero;