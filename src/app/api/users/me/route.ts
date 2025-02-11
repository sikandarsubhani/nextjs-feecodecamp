  // // C:\Users\navee\Desktop\sikandar\Coding\next-app\src\app\api\users\me\route.ts

  // import { NextResponse,NextRequest } from "next/server";
  // import { connect } from "@/dbConfig/dbConfig";
  // import { getDataFromToken } from "@/helper/getDataFromToken";
  // import User from "@/models/userModel";

  // connect();

  // export async function GET(request:NextRequest){
  //   try {
  //     const userID=await getDataFromToken(request);
  //     const user=User.findOne({_id: userID}).select("-password");
  //     return NextResponse.json({
  //       message: "user found",
  //       data: user
  //     })

  //   } catch (error) {
  //     return NextResponse.json({error: error.message},{status: 400})

  //   }
  // }


  import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helper/getDataFromToken";
import User from "@/models/userModel";

connect();

export async function GET(request: NextRequest) {
  try {
    const userID = await getDataFromToken(request);
    console.log("User ID from Token:", userID);

    if (!userID) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const user = await User.findOne({ _id: userID }).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User found",
      data: user,
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
