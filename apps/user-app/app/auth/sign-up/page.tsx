"use client";
import { Input } from "@pay/ui/input";
import { Button } from "@pay/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@pay/ui/form";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import Link from "next/link";
import { signUp } from "../../lib/auth";
import { signIn } from "next-auth/react";

const signUpSchema = z.object({
    name: z.string().min(1, "Enter your name"),
    phone: z.string().min(1, "Enter a valid phone number"),
    password: z.string().min(1, "Invalid Password"),
});

export type signUpType = z.infer<typeof signUpSchema>

export default function SignUp() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<signUpType>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            phone: "",
            password: "",
        },
    });

    async function onSubmit(values: signUpType) {
        setLoading(true);
        setError(null);
        try {
            const { success, error } = await signUp(values);
            if (!success) {
                setError(error || "Failed to sign up. Please try again.");
                return;
            }
            signIn();
        } catch (err) {
            console.error("Sign up error:", err);
            setError("An unexpected error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center temp">
            <div className="w-full max-w-2xl p-8 space-y-6 bg-card rounded-xl shadow-lg z-10">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Create an Account
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your details to sign up
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Enter your name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter your phone number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Enter your password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {error && (
                            <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full font-semibold"
                            size="lg"
                        >
                            {loading ? (
                                <>
                                    <span className="mr-2 animate-pulse">Signing Up</span>
                                    <span className="animate-pulse">...</span>
                                </>
                            ) : (
                                "Sign up"
                            )}
                        </Button>
                    </form>
                    <p className="text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/auth/sign-in" className="text-foreground underline">
                            Sign in
                        </Link>
                    </p>
                </Form>
            </div>
        </main>
    );
}
