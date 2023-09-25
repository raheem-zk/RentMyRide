// import React, { useState } from 'react';
// import React, { useState } from "react";
// import Google from "../../component/googleLogin";
// import LoginPageLeftImage from "../../component/loginPageLeftImage";
// import { Link } from "react-router-dom";
// function UserLogin() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
  
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       console.log("Email:", email);
//       console.log("Password:", password);
//     };

//     return (
//         <div className="min-h-screen flex my-2 mx-[15%] shadow-xl shadow-gray-700 bg-gray-100 rounded-lg">
//           <LoginPageLeftImage />
//           <div className="flex-1 flex items-center justify-center p-5 ">
//             <div className="max-w-md w-full space-y-8">
//               <div className="text-center">
//                 <h2 className="text-4xl font-extrabold">Welcome Back!</h2>
//                 <p className="mt-2">Sign in to your account</p>
//               </div>
              
//               <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//                 <div className="rounded-md shadow-sm -space-y-px">
//                   <div>
//                     <label htmlFor="email-address" className="sr-only">
//                       Email address
//                     </label>
//                     <input
//                       id="email-address"
//                       name="email"
//                       type="email"
//                       autoComplete="email"
//                       required
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                       placeholder="Email address"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="password" className="sr-only">
//                       Password
//                     </label>
//                     <input
//                       id="password"
//                       name="password"
//                       type="password"
//                       autoComplete="current-password"
//                       required
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-gray-400 focus:border-gray-200 focus:z-10 sm:text-sm"
//                       placeholder="Password"
//                     />
//                   </div>
//                 </div>
    
//                 <div>
//                   <button
//                     type="submit"
//                     className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
//                   >
//                     Sign in
//                   </button>
//                   <div className="text-sm md:flex md:justify-between">
//                     <Link to='/forgot-password'
//                       className="font-medium text-indigo-600 hover:text-indigo-500 flex justify-center"
//                     >
//                       Forgot your password?
//                     </Link>
//                     <Link to="/signup"className="btn font-medium text-black-600 hover:text-black-900 flex justify-center ">
//                     Create your RentMyRide account
//                     </Link>
//                   </div>
//                 </div>
//                 <div className="flex justify-center">
//                 <Google />
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       );
// }

// export default UserLogin;


import React from 'react'
import LoginFrame from '../../component/loginFrame'
import UserLogin from '../../component/userLogin'

function Login() {
  const imgUrl = 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=600';
  return (
    <LoginFrame SidePart={UserLogin} img={imgUrl}/>
    )
}

export default Login;
