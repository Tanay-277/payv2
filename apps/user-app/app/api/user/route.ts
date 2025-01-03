import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../lib/auth";

export const GET = async () => {
    const session = await getServerSession(authOptions);
    return session?.user
        ? NextResponse.json({ user: session.user })
        : NextResponse.json({ message: "You are not logged in" }, { status: 403 });
};
