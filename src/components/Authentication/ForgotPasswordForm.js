import React, { useRef } from "react";
import { useHistory } from "react-router";

const ForgotPasswordForm = ()=>{

    const emailRef = useRef();
    const history = useHistory();
    const verificationHandler = (event)=>{
        event.preventDefault();
        (async function fetchData(){
            try{
                const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDiNPSbnww3wqjV__h5IH1CxHVhOpu7zD4',{
                method:'POST',
                body: JSON.stringify({
                    requestType:'PASSWORD_RESET',
                    email: emailRef.current.value
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            console.log(response)
            const data = await response.json();
            console.log(data);
            history.replace("/auth");
            }catch(error){
                console.log(error)
            }
        })()
    }
    return(
        <div className="flex justify-center items-center mt-10">
            <form className="border-2 border-green-500 shadow-md rounded-md w-80 px-8 py-5" onSubmit={verificationHandler}>
                <div className="flex justify-center mb-4">
                    <h1 className="text-xl font-medium">Password Recovery</h1>
                </div>
                <div>
                    <label htmlFor="email" className="text-md font-medium mb-2">Enter the registered email:</label>
                    <input type="text" id="email"  className="border border-slate-600 px-2 mb-2 w-full" ref={emailRef}/>
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 mt-3 rounded-md shadow-md">Send Link</button>
                </div>
            </form>
        </div>
    )
}

export default ForgotPasswordForm;