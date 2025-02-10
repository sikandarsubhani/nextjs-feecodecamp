// 'use client'
// import React, { useEffect } from 'react'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'
// import axios from 'axios'
// import toast from 'react-hot-toast'

// const Login = () => {
//   const router = useRouter()
//   const [user, setUser] = React.useState({
//     email: "",
//     password: "",
//   })
//   const [loading, setLoading] = React.useState(false)
//   const [buttonDisabled, setButtonDisabled] = React.useState(false)


//   const onLogin = async () => {
//     try {
//       setLoading(true)
//       const response = await axios.post("/api/users/login", user)
//       console.log("Login Success", response.data)
//       toast.success("Login Success")
//       router.push("/")

//     } catch (error) {
//       console.log("Login Failed", error.message);
//       toast.error(error.message)
//     } finally {
//       setLoading(false)
//     }

//   }

//   useEffect(() => {
//     setButtonDisabled(!(user.email && user.password));
//   }, [user]); return (
//     <div className='flex flex-col items-center justify-center min-h-screen py-2'>
//       <h1>{loading ? 'Processing' : 'Login'}</h1>
//       <hr />
//       <label htmlFor="email">email</label>
//       <input className='p-2 border border-gary-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
//         type="text" id='email' value={user.email}
//         onChange={(e) => setUser({ ...user, email: e.target.value })}
//         placeholder='email' />

//       <label htmlFor="password">password</label>
//       <input className='p-2 border border-gary-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
//         type="password" id='password' value={user.password}
//         onChange={(e) => setUser({ ...user, password: e.target.value })}
//         placeholder='password' />
//       <button
//         onClick={onLogin}
//         className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 br-4'>Login</button>
//       <p
//         className='text-sm text-gray-600 mt-3'>
//         Dont have an account?
//         <Link href='/signup'> SignUp</Link>
//       </p>
//     </div>
//   )
// }

// export default Login

'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      toast.success("Login Successful!");

      // Redirect after success
      router.push("/profile");

    } catch (error: any) {
      toast.error(error.response?.data?.error || "Login Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className="text-2xl font-bold mb-4">{loading ? 'Processing...' : 'Login'}</h1>

      <label htmlFor="email" className="self-start text-sm font-semibold">Email</label>
      <input
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 w-80'
        type="text"
        id='email'
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder='Enter your email'
      />

      <label htmlFor="password" className="self-start text-sm font-semibold">Password</label>
      <input
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 w-80'
        type="password"
        id='password'
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder='Enter your password'
      />

      <button
        onClick={onLogin}
        disabled={buttonDisabled || loading}
        className={`bg-blue-500 text-white font-bold py-2 px-4 rounded-lg w-80 ${buttonDisabled || loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className='text-sm text-gray-600 mt-3'>
        Don't have an account? <Link href='/signup' className="text-blue-500 hover:underline">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
