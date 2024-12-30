import db from "@pay/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    pages:{
        signIn:"/auth/sign-in",
        newUser:"/auth/sign-up"
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                phone: {
                    label: "Phone number",
                    type: "text",
                    placeholder: "1231231231",
                    required: true,
                },
                password: { label: "Password", type: "password", required: true },
            },
            async authorize(credentials) {
                if (!credentials) return null;

                const { phone, password } = credentials;
                const existingUser = await db.user.findFirst({
                    where: { number: phone },
                });

                if (existingUser) {
                    const isValidPassword = await bcrypt.compare(
                        password,
                        existingUser.password
                    );
                    if (isValidPassword) {
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.number,
                        };
                    }
                    return null;
                }

                const hashedPassword = await bcrypt.hash(password, 10);
                try {
                    const newUser = await db.user.create({
                        data: { number: phone, password: hashedPassword, name: phone },
                    });
                    return {
                        id: newUser.id.toString(),
                        name: newUser.name,
                        email: newUser.number,
                    };
                } catch (error) {
                    console.error(error);
                    return null;
                }
            },
        }),
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({ token, session }) {
            if (token?.sub) {
                //@ts-ignore
                session.user.id = token.sub;
            }
            return session;
        },
    },
};
