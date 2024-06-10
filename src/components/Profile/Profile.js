import React, { useState } from "react";
import ProfileForm from "./ProfileForm";
import { useSelector } from "react-redux";

const Profile = ()=>{
    const [showForm, setShowForm] = useState(false);
    const jwtToken = useSelector((state)=>state.auth.jwtToken);
    const [isVerified, setIsVerified] = useState(false);
    const [name, setName] = useState('');

    const toggleForm = ()=>{
        setShowForm((prevState) =>!prevState)
    }
    const verifyHandler =async ()=>{
        try{
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDiNPSbnww3wqjV__h5IH1CxHVhOpu7zD4',{
            method:'POST',
            body: JSON.stringify({
                requestType:'VERIFY_EMAIL',
                idToken:jwtToken,
            })
        })
        const data = await response.json()
        console.log(data)
        setIsVerified(true);
            
        } catch (error){
            console.log(error.message)
        }

    }
    const updateName = (name)=>{
        setName(name)
    }
    return(
        <section>
            <div className="flex justify-center items-center flex-col px-10">
                <h1 className="text-5xl mb-8 font-bold">Welcome to Expense Tracker {name}</h1>
                <h2 className="text-2xl mb-14 font-semiBold capitalize">Log and manage your expenses efficiently</h2>
                {!showForm && <h2>Your profile is incomplete <button onClick={toggleForm} className="text-blue-500 underline">Complete Now</button> </h2>}
                {isVerified && <button className="bg-green-500 hover:bg-green-600 py-1 px-2 text-white rounded shadow-md mt-4" onClick={verifyHandler}>Verify Email</button>}
            </div>
            {showForm && <ProfileForm onToggle={toggleForm} onUpdate={updateName}/>}
        </section>
    )
}

export default Profile;