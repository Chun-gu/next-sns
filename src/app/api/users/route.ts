import { NextResponse } from "next/server";

// MARK: getUsers
export async function GET() {
	return NextResponse.json({ data: "Hi" }, { status: 200 });
}
