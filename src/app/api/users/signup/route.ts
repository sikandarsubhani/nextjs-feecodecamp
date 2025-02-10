import {connect} from '@/dbConfig/dbConfig'
import User from "@/models/userModel"
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'


connect()

export async function POST(request: NextRequest) {
  try {
    const reqBody=await request.json()
    const {username, password, email} = reqBody
    const user=await User.findOne({email})
    if(user){
      return new Response(JSON.stringify({message: 'User already exists'}), {
        status: 400})
      }
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({
      username,
      password: hashedPassword,
      email
      })
      const SavedUser = await newUser.save()
      console.log(newUser,SavedUser);

      return NextResponse.json({
        message: 'User created successfully',
        success:true,
        SavedUser
      })
  } catch (error: any) {
    return NextResponse.json({error: error.message})

  }

}