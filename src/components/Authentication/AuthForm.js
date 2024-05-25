import React, { useContext, useRef, useState } from "react";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router";


const AuthForm = () => {
  const [hasAccount, setHasAccount] = useState(true);
  const authCtx = useContext(AuthContext);
  const history = useHistory();

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
                    authCtx.login(data.idToken, data.displayName)
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
        className="border-2 border-green-500 shadow-md px-8 py-5"
      >
        <h2 className="mb-3 font-medium text-lg text-blue-800 text-center">
          {hasAccount ? `Sign In` : `Create New Account`}
        </h2>
        <div>
          <input
            type="text"
            placeholder="Enter Email Id"
            required
            ref={emailRef}
            className="border border-slate-500 p-1 mb-3 placeholder:text-sm text-slate-500"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Enter Password"
            required
            ref={passwordRef}
            className="border border-slate-500 p-1 mb-3 placeholder:text-sm text-slate-500"
          />
        </div>
        {!hasAccount && (
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              required
              ref={confirmPasswordRef}
              className="border border-slate-500 p-1 mb-3 placeholder:text-sm text-slate-500"
            />
          </div>
        )}
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md shadow-lg my-3"
          >
            {hasAccount ? `SignIn` : `SignUp`}
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
