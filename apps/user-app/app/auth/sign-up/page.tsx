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

const signInSchema = z.object({
    name: z.string().min(1, "Enter your name"),
    email: z.string().email("Enter a valid email address"),
    phone: z.string().min(1, "Enter a valid phone number"),
    password: z.string().min(1, "Invalid Password"),
});

export default function SignUp() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof signInSchema>) {
        setLoading(true);
        setError(null);
        try {
            // Simulate sign-up process
            await new Promise((resolve) => setTimeout(resolve, 2000));
            // Handle successful sign-up
            window.location.href = "/auth/sign-in";
        } catch (err) {
            setError("Failed to sign up. Please try again.");
            console.log(err);
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
                        <div className="grid grid-cols-2 gap-4">
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
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="Enter your email" {...field} />
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
                        </div>

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
                                    <span className="mr-2">Signing up</span>
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
