import React, { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const ProfileForm = (props) => {
  const jwtToken = useSelector((state)=>state.auth.jwtToken)
  const nameRef = useRef();
  const photoUrlref = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredPhotoUrl = photoUrlref.current.value;
    (async function updateDetails() {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDiNPSbnww3wqjV__h5IH1CxHVhOpu7zD4",
          {
            method: "POST",
            body: JSON.stringify({
              idToken: jwtToken,
              displayName: enteredName,
              photoUrl: enteredPhotoUrl,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          props.onToggle();
          console.log(data);
        } else {
          throw new Error(data.error.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    })();
  };
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDiNPSbnww3wqjV__h5IH1CxHVhOpu7zD4",
        {
          method: "POST",
          body: JSON.stringify({ idToken: jwtToken }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        nameRef.current.value = data.users[0].displayName;
        photoUrlref.current.value = data.users[0].photoUrl;
        
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [jwtToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="flex justify-center items-center mt-10">
      <form
        className="border-2 border-green-500 shadow-md rounded-md w-80 px-8 py-5"
        onSubmit={submitHandler}
      >
        <div className="flex justify-between mb-5">
          <h2 className="text-xl font-medium">Contact Details</h2>
          <button
            className="bg-blue-600 text-white text-sm hover:bg-blue-700 rounded shadow p-1"
            onClick={props.onToggle}
          >
            Cancel
          </button>
        </div>
        <div>
          <label htmlFor="name" className="text-md font-medium">
            Full Name:{" "}
          </label>
          <input
            type="text"
            id="name"
            className="border border-slate-600 px-2 mb-2 w-full"
            ref={nameRef}
          />
        </div>
        <div>
          <label htmlFor="photourl" className="text-md font-medium">
            Profile Photo URL:{" "}
          </label>
          <input
            type="text"
            id="photourl"
            className="border border-slate-600 px-2 mb-2 w-full"
            ref={photoUrlref}
          />
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 mt-3 rounded-md shadow-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
