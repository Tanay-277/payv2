import { NextRequest, NextResponse } from "next/server";
import { SignUpType } from "../../../types";
import db from "@pay/db/client"
import { hashItem } from "@pay/utils";

export async function POST(req: NextRequest) {
    try {
        const payload: SignUpType = await req.json();

        if (!payload.name || !payload.phone || !payload.password) {
            return NextResponse.json({ msg: "Missing required fields" }, { status: 400 });
        }

        const existingUser = await db.user.findFirst({
            where: { number: payload.phone }
        });

        if (existingUser) {
            return NextResponse.json({ msg: "User already exists" }, { status: 409 });
        }

        const hashedPassword = await hashItem(payload.password);

        const user = await db.user.create({
            data: {
                name: payload.name,
                number: payload.phone,
                password: hashedPassword,
            },
            select: {
                id: true,
                name: true,
                number: true,
            }
        });

        return NextResponse.json({ msg: "Success", user }, { status: 201 });
    } catch (error) {
        console.error('Sign-up error:', error);
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    }
}