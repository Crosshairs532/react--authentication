import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase.config";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
const Register = () => {
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

            })
            .catch(error => {
                console.log(error)
                setError(error.message)
            })
    }
    return (
        <div>
            <h1 className=" text-center text-5xl font-extrabold mt-[10%]">this is Register page</h1>
            <div className=" bg-red-400 mx-auto w-1/2 p-7">
                <form onSubmit={handleSubmit}>
                    <input className=" mb-3 w-full p-3" type="email" name="email" id="" placeholder="enter your email...." />
                    <br />
                    <div className=" flex items-center">
                        <input className=" mb-3 w-full p-3" type={`${txt}`} name="password" id="" placeholder="enter password...." />
                        <span onClick={() => handletoggle(!tg)} >{tg ? <AiFillEyeInvisible></AiFillEyeInvisible> : <AiFillEye></AiFillEye>} </span></div>
                    <br />
                    <input className=" mb-3 w-1/4 p-3 bg-emerald-950 text-white" type="submit" value="Register" />

                </form>
                {
                    regError && <p>{regError}</p>
                }
                {
                    success && <p>{success}</p>
                }
            </div >
        </div >
    );
};

export default Register;