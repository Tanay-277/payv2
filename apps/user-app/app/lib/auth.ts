import db from "@pay/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";


export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/auth/sign-in",
        newUser: "/auth/sign-up"
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                phone: {
                    label: "Phone number",
                    type: "number",
                    placeholder: "1231231231",
                    required: true,
                },
                password: { label: "Password", type: "password", required: true },
            },
            async authorize(credentials) {
                if (!credentials) return null;

                try {
                    const { phone, password } = credentials;

                    const existingUser = await db.user.findFirst({
                        where: {
                            number: phone,
                        },
                    });

                    if (!existingUser) return null;

                    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
                    if (!isPasswordValid) return null;

                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        email: existingUser.number,
                    };

                } catch (error) {
                    console.error("Error during authorization", error);
                    return null;
                }
            },
        }),
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({ token, session }) {
            if (token?.sub) {
                (session.user as any).id = token.sub;
            }
            return session;
        },
    },
};
