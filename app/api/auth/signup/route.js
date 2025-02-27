import { signupUser } from "@/utils/auth/signup";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const reqBody = await req.json(); // Parse request body
        const response = await signupUser(reqBody);
        return NextResponse.json(response, { status: response.status });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Server Error", error: error.message }, { status: 500 });
    }
}
