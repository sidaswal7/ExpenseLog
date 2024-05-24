import React, { useState } from "react";
import ProfileForm from "./ProfileForm";

const Profile = ()=>{
    const [showForm, setShowForm] = useState(false);

    const toggleForm = ()=>{
        setShowForm((prevState) =>!prevState)
    }
    return(
        <section>
            <div className="flex justify-center items-center flex-col px-10">
                <h1 className="text-3xl mb-8 font-semibold">Welcome to Expense Tracker!</h1>
                {!showForm && <h2>Your profile is incomplete <button onClick={toggleForm} className="text-blue-500 underline">Complete Now</button> </h2>}
            </div>
            {showForm && <ProfileForm onToggle={toggleForm}/>}
        </section>
    )
}

export default Profile;