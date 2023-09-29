import { sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
const Login = () => {
    const [regError, setError] = useState('')
    const [logg, setLog] = useState('')
    const emailref = useRef(null)
    const handleLogin = e => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        setLog('')
        setError('')
        signInWithEmailAndPassword(auth, email, password)
            .then(rslt => {
                if (rslt.user.emailVerified) {
                    alert('you are varied you may log in')
                    setLog('succesfully logges in')
                }
                else {
                    alert('you are not varified. please varofy yourself')
                }

            })
            .catch(er => setError('cannot logged in'))
    }
    const handleforgetpass = () => {
        const email = emailref.current.value;
        console.log(email)
        if (!email) {
            alert('provide and email')
            return;
        }
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            alert('write a valid email')
            return
        }
        else {
            sendPasswordResetEmail(auth, email)
                .then(() => alert('check mail'))
                .catch(error => console.log(error))
        }
    }


    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin}>
                            <div className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" ref={emailref} name='email' placeholder="email" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" name='password' placeholder="password" className="input input-bordered" />
                                    <label className="label">
                                        <a href="#" onClick={handleforgetpass} className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Login</button>
                                </div>

                            </div>
                        </form>
                        {
                            logg && <p>{logg} </p>
                        }
                        {
                            regError && <p>{regError}</p>
                        }
                        {
                            <p>new here? <Link to='/hero' >Register Now</Link></p>
                        }

                    </div>
                </div>
            </div>
        </div >
    );
};

export default Login;