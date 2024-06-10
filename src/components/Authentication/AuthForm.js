import React, { useRef, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth-slice";

const AuthForm = () => {
  const [hasAccount, setHasAccount] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();
  const switchAuthHandler = ()=>{
    setHasAccount((prevState)=> !prevState)
  }
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const formHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    
    if(hasAccount){
        (async function logIn(){
            try{
                const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDiNPSbnww3wqjV__h5IH1CxHVhOpu7zD4`,{
                    method:'POST',
                    body: JSON.stringify({
                        email: enteredEmail,
                        password: enteredPassword,
                        returnedSecureToken: true                       
                    }),
                    headers:{
                        'Content-Type':'application/json'
                    }
                })
                const data = await response.json();
                if(response.ok){
                    dispatch(
                      login({
                        jwtToken: data.idToken,
                        userName: data.displayName
                      })
                    )
                    console.log(data)
                    history.replace('/profile')
                } else{
                    throw new Error(data.error.message)
                }

            } catch(error){
                alert(error.message);
            }
        })();
    } else{
        const confirmPassword = confirmPasswordRef.current.value;
        if(enteredPassword !== confirmPassword){
            alert("The password did not match")
            return;
        }
        (async function signUp(){
            try{
                const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDiNPSbnww3wqjV__h5IH1CxHVhOpu7zD4`,{
                    method:'POST',
                    body: JSON.stringify({
                        email: enteredEmail,
                        password: enteredPassword,
                        returnedSecureToken: true                       
                    }),
                    headers:{
                        'Content-Type':'application/json'
                    }
                })
                const data = await response.json();
                if(response.ok){
                    alert('Your account has been created successfully')
                } else{
                    throw new Error(data.error.message)
                }

            } catch(error){
                alert(error.message);
            }
        })();
    }
  };
  return (
    <div className="flex justify-center items-center mt-20">
      <form
        onSubmit={formHandler}
        className="shadow-md px-8 py-5 rounded-sm"
      >
        <h2 className="mb-3 font-medium text-xl text-center font-semibold">
          {hasAccount ? `Sign In` : `Create New Account`}
        </h2>
        <div>
          <input
            type="text"
            placeholder="Enter Email Id"
            required
            ref={emailRef}
            className="border border-slate-500 py-1 px-3 mb-5 mt-5 placeholder:text-sm text-slate-500 rounded"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Enter Password"
            required
            ref={passwordRef}
            className="border border-slate-500 py-1 px-3 mb-5 rounded placeholder:text-sm text-slate-500"
          />
        </div>
        { hasAccount && (
            <div className="flex justify-center items-center">
                <Link to="/forgot-password" className="text-red-500 underline text-sm">Forgot Password?</Link>
            </div>
        )}
        {!hasAccount && (
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              required
              ref={confirmPasswordRef}
              className="border border-slate-500 py-1 px-3 mb-5 rounded placeholder:text-sm text-slate-500"
            />
          </div>
        )}
        <div className="flex justify-center items-center mt-3">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md shadow-lg my-3"
          >
            {hasAccount ? `Sign In` : `Sign Up`}
          </button>
        </div>
        <p className="text-sm text-slate-500 mr-1 text-center">
          {hasAccount ? `Not a user?`:`Already a user?`}
          <button className="text-green-500 ml-2" onClick={switchAuthHandler}>
            {hasAccount ? `Sign Up`:`Sign In`}
          </button>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
