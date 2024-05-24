import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

const AuthForm = ()=>{

    const [hasAccount, setHasAccount] = useState(true);

    const emailRef = useRef('');
    const passwordRef = useRef('');
    const confirmPasswordRef = useRef('');

    const formHandler = (event)=>{
        event.preventDefault();

        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        console.log(enteredEmail,enteredPassword)
    }
    return(
        <div className="flex justify-center items-center mt-20">
            <form onSubmit={formHandler} className="border-2 border-green-500 shadow-md px-8 py-5">
                <h2 className="mb-3 font-medium text-lg text-blue-800 text-center">{hasAccount ? `Sign In`:`Create New Account`}</h2>
                <div>
                    <input type="text" placeholder="Enter Email Id" required ref={emailRef} className="border border-slate-500 p-1 mb-3 placeholder:text-sm text-slate-500" />
                </div>
                <div>
                    <input type="password" placeholder="Enter Password" required ref={passwordRef} className="border border-slate-500 p-1 mb-3 placeholder:text-sm text-slate-500"/>
                </div>
                {!hasAccount && (
                    <div>
                        <input type="password" placeholder="Confirm Password" required ref={passwordRef} className="border border-slate-500 p-1 mb-3 placeholder:text-sm text-slate-500"/>
                    </div>
                )}
                <div className="flex justify-center items-center">
                    <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md shadow-lg my-3">{hasAccount ? `SignIn`: `SignUp`}</button>
                </div>
                <p className="text-sm text-slate-500 mr-1 text-center">Already a user? <Link to="/" className="text-green-500">SignIn</Link></p>
            </form>
            
        </div>
    )
}

export default AuthForm;