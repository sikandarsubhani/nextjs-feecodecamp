// 'use client'
// import React, { useEffect } from 'react'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'
// import toast from 'react-hot-toast'
// import axios from 'axios'


// const Signup = () => {
//   const router = useRouter()
//   const [user, setUser] = React.useState({
//     email: "",
//     password: "",
//     username: "",
//   })
//   const [loading, setLoading] = React.useState(false)
//   const [buttonDisabled, setButtonDisabled] = React.useState(false)
//   const validateEmail = (email) => {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(email);
//   }

//   const onSignup = async () => {
//     if (!user.username || !user.email || !user.password) {
//       toast.error("All fields are required");
//       return;
//     }
//     if (!validateEmail(user.email)) {
//       toast.error("Invalid email format");
//       return;
//     }
//     if (user.password.length < 6) {
//       toast.error("Password must be at least 6 characters");
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await axios.post("/api/users/signup", user);
//       console.log('Signup Successful', response.data);
//       toast.success("Signup Successful");
//       router.push('/login');
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || "Signup failed");
//     } finally {
//       setLoading(false);
//     }
//   }
//   useEffect(() => {
//     if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
//       setButtonDisabled(false)
//     }
//     else {
//       setButtonDisabled(true)
//     }
//   }, [user])
//   return (
//     <div className=' flex flex-col items-center justify-center min-h-screen oy-2'>
//       <h1>{loading ? "Processing" : "Signup"}</h1>
//       <hr />
//       <label htmlFor="username">username</label>
//       <input className='text-black p-2 border border-gary-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
//         type="text" id='username' value={user.username}
//         onChange={(e) => setUser({ ...user, username: e.target.value })}
//         placeholder='UserName' />
//       <label htmlFor="email">email</label>
//       <input className='text-black p-2 border border-gary-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
//         required type="email" id='email' value={user.email}
//         onChange={(e) => setUser({ ...user, email: e.target.value })}
//         placeholder="email"
//       />

//       <label htmlFor="password">password</label>
//       <input className='text-black p-2 border border-gary-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
//         type="password" id='password' value={user.password}
//         onChange={(e) => setUser({ ...user, password: e.target.value })}
//         placeholder='password' />
//       <button
//         onClick={onSignup}
//         className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 br-4'>Signup</button>
//       <p
//         className='text-sm text-gray-600 mt-3'>
//         Already have an account?
//         <Link href='/login'> Signup </Link>
//       </p>
//     </div>
//   )
// }

// export default Signup
'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';

// Define user state type
interface UserState {
  email: string;
  password: string;
  username: string;
}

// Define error state type
interface ErrorState {
  email?: string;
  password?: string;
  username?: string;
}

const Signup = () => {
  const router = useRouter();

  // User state with explicit type
  const [user, setUser] = useState<UserState>({
    email: "",
    password: "",
    username: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [errors, setErrors] = useState<ErrorState>({});

  // Function to validate input fields
  const validateForm = (): boolean => {
    const newErrors: ErrorState = {}; // Fixed 'prefer-const' ESLint issue

    if (!user.username) {
      newErrors.username = "Username is required";
    }

    if (!user.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!user.password) {
      newErrors.password = "Password is required";
    } else if (user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSignup = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log('Signup Successful', response.data);
      toast.success("Signup Successful");
      router.push('/login');
    } catch (error: any) { // Fixed TypeScript error: 'error is of type unknown'
      console.error(error);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Enable button only if all fields are filled
    setButtonDisabled(!(user.email && user.password && user.username));
  }, [user]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "Processing..." : "Signup"}</h1>
      <hr />

      {/* Username Input */}
      <label htmlFor="username">Username</label>
      <input
        className='text-black p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:border-gray-600'
        type="text" id='username' value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder='Username'
      />
      {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}

      {/* Email Input */}
      <label htmlFor="email">Email</label>
      <input
        className='text-black p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:border-gray-600'
        type="email" id='email' value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

      {/* Password Input */}
      <label htmlFor="password">Password</label>
      <input
        className='text-black p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:border-gray-600'
        type="password" id='password' value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder='Password'
      />
      {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

      {/* Signup Button */}
      <button
        onClick={onSignup}
        disabled={buttonDisabled}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
          ${buttonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        {loading ? "Processing..." : "Signup"}
      </button>

      {/* Login Link */}
      <p className='text-sm text-gray-600 mt-3'>
        Already have an account?
        <Link href='/login' className='text-blue-500'> Login</Link>
      </p>
    </div>
  );
}

export default Signup;