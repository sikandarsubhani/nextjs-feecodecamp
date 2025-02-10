// // src/app/api/users/login/route.ts


// import {connect} from '@/dbConfig/dbConfig'
// import User from "@/models/userModel"
// import { NextRequest, NextResponse } from 'next/server'
// import bcryptjs from 'bcryptjs'
// import jwt from "jsonwebtoken"

// connect()

// export async function POST(request: NextRequest) {
//   try {
//     const reqBody=await request.json()
//     const { email, password } = reqBody
//     console.log(reqBody)
//     const user=await User.findOne({email})
//     if(!user){
//       return NextResponse.json({error: "User does not exist"},{status: 400})
//     }
//     const isValidPassword = await bcryptjs.compare(password, user.password)
//     if (!isValidPassword) {
//       return NextResponse.json({error: "Invalid password"},{status: 400})
//     }
//     // create token data
//     const tokenData = {
//       id: user._id,
//       email: user.email,
//       username: user.username
//     }
//     const token= await jwt.sign(tokenData,process.env.TOKEN_SECRET, {expiresin:"1h"})

//     const response =NextResponse.json({
//       message : 'Login Successful',
//       success: true,
//     })
//     response.cookies.set('token',token,{httpOnly:true})

//     return response;
//   } catch (error: any) {
//     return NextResponse.json({error: error.message},{status: 500})
//   }

// }


import { connect } from '@/dbConfig/dbConfig'
import User from "@/models/userModel"
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { email, password } = reqBody

    console.log("Received request:", reqBody)

    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 })
    }

    const isValidPassword = await bcryptjs.compare(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 })
    }

    // Token data
    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username
    }

    // Fix expiresIn
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1h" })

    const response = NextResponse.json({
      message: "Login Successful",
      success: true,
    })

    response.cookies.set('token', token, { httpOnly: true })

    return response
  } catch (error: any) {
    console.error("Login API Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
