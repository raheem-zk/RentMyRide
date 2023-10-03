import React, { useState } from "react";
import SignupForm from "./signupForm";
import AddCar from "./addCar";

function Signup() {
  const [page, setPage] = useState(false);
  const HandlePage =()=>{
    setPage(!page);
  }
  return (
    <div className="min-h-screen flex md:my-2 md:mx-[15%] shadow-xl shadow-gray-700 bg-gray-100 rounded-lg">
      {page ? <SignupForm page={HandlePage}/> : <AddCar/>}
    </div>
  ) ;
}

export default Signup;
