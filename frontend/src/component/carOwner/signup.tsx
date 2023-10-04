import React, { useState } from "react";
import SignupForm from "./signupForm";
import AddCar from "./addCar";

function Signup() {
  const [page, setPage] = useState(false);
  const [optComponent, setOtpComponent] = useState(false);
  const HandlePage =()=>{
    setPage(!page);
  }
  const handleOtpComponet = ()=>{
    setOtpComponent(!optComponent);
  }
  return (
    <div className="min-h-screen flex md:my-2 md:mx-[15%] shadow-xl shadow-gray-700 bg-gray-100 rounded-lg">
      {optComponent && <>hlo opt page</>}
      {page ? <SignupForm page={HandlePage}/> : <AddCar next={handleOtpComponet}/>}
    </div>
  ) ;
}

export default Signup;
