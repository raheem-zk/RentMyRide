import axios from 'axios';
import React, { useState , SyntheticEvent} from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function AdminLoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const error = (message: string): void => {
    toast.error(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    console.log(message);
  };
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    if (password.length < 7) {
      return error('Password must be at least 7 characters long.')
    }

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_ADMIN_API_URL}/login`,{email, password})
      .then((res)=>{
        if(res.data.error){
          return error(res.data.message);
        }
        localStorage.setItem("adminToken", res.data.token);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.token}`;

        navigate('/admin/dashboard');
      })
      .catch((err)=>{
        console.log(err);
        return error(err.response.data.message)
      })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-5">
      <ToastContainer />
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold">Welcome Back!</h2>
          <p className="mt-2">Sign in to your account</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-gray-400 focus:border-gray-200 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              Sign in
            </button>
          </div>
          <div className="flex justify-center">
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLoginForm
