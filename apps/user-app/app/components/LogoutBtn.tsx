"use client";
import { Button, ButtonProps } from "@pay/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { cn } from "@pay/utils"

export default function LogoutBtn({ variant, size, className }: ButtonProps) {
    return (
        <Button asChild onClick={() => signOut()} variant={variant} size={size}>
            <Link href="/sign-in" className={cn("w-full", className)}>Logout</Link>
        </Button>
    );
}