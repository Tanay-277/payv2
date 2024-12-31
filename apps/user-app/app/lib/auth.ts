import db from "@pay/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { compareItem } from "@pay/utils";
import { SignUpType } from "../types";

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
                if (!credentials) {
                    throw new Error("No credentials provided");
                }

                const { phone, password } = credentials;

                if (!phone || !password) {
                    throw new Error("Phone number and password are required");
                }

                try {
                    const existingUser = await db.user.findFirst({
                        where: {
                            number: phone,
                        },
                    });

                    if (!existingUser) {
                        throw new Error("User not found");
                    }

                    const isPasswordValid = await compareItem(password, existingUser.password);
                    if (!isPasswordValid) {
                        throw new Error("Invalid password");
                    }

                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        email: existingUser.number,
                    };

                } catch (error: any) {
                    console.error("Error during authorization", error);
                    throw new Error(error.message || "Authorization failed");
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

export async function signUp({ name, phone, password }: SignUpType): Promise<{ success: boolean; error?: string }> {
    try {
        if (!name || !phone || !password) {
            throw new Error('All fields are required');
        }

        if (phone.length < 2) {
            throw new Error('Invalid phone number');
        }

        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters');
        }

        const response = await fetch('/api/auth/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, phone, password }),
            credentials: 'include'
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Signup failed');
        }

        const data = await response.json();
        return { success: true };

    } catch (error) {
        console.error('Signup error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'An unexpected error occurred'
        };
    }
}