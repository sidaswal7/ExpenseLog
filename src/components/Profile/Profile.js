import React, { useContext, useState } from "react";
import ProfileForm from "./ProfileForm";
import AuthContext from "../../store/auth-context";

const Profile = ()=>{
    const [showForm, setShowForm] = useState(false);
    const authCtx = useContext(AuthContext);

    const toggleForm = ()=>{
        setShowForm((prevState) =>!prevState)
    }
    const verifyHandler =async ()=>{
        try{
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDiNPSbnww3wqjV__h5IH1CxHVhOpu7zD4',{
            method:'POST',
            body: JSON.stringify({
                requestType:'VERIFY_EMAIL',
                idToken:authCtx.token,
            })
        })
        const data = await response.json()
        console.log(data)
            
        } catch (error){
            console.log(error.message)
        }

    }
    return(
        <section>
            <div className="flex justify-center items-center flex-col px-10">
                <h1 className="text-3xl mb-8 font-semibold">Welcome to Expense Tracker</h1>
                {!showForm && <h2>Your profile is incomplete <button onClick={toggleForm} className="text-blue-500 underline">Complete Now</button> </h2>}
                <button className="bg-green-500 hover:bg-green-600 py-1 px-2 text-white rounded shadow-md mt-4" onClick={verifyHandler}>Verify Email</button>
            </div>
            {showForm && <ProfileForm onToggle={toggleForm}/>}
        </section>
    )
}

export default Profile;