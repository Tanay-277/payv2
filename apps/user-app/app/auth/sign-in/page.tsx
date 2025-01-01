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

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

const signInSchema = z.object({
    phone: z.string().min(1, "Enter a valid phone number"),
    password: z.string().min(1, "Invalid Password"),
});

export default function SignIn() {
    const navigate = useRouter()
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            phone: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof signInSchema>) {
        setLoading(true);
        setError(null);
        try {
            const result = await signIn("credentials", {
                redirect: false,
                phone: values.phone,
                password: values.password,
                callbackUrl,
            });
            if (result?.error) {
                setError(result.error);
            } else {
                navigate.replace("/")
            }
        } catch (err) {
            setError("Failed to sign in. Please try again.");
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center temp">
            <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-xl shadow-lg z-10">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Welcome Back
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your credentials to sign in
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                            <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm font-medium">
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
                                    <span className="mr-2 animate-pulse">Signing in</span>
                                    <span className="animate-pulse">...</span>
                                </>
                            ) : (
                                "Sign in"
                            )}
                        </Button>
                    </form>
                    <p className="text-sm text-muted-foreground">
                        Dont have an account?{" "}
                        <Link href="/auth/sign-up" className="text-foreground underline">
                            Create One
                        </Link>
                    </p>
                </Form>
            </div>
        </main>
    );
}
