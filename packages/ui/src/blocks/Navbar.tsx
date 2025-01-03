"use client";

import React, { forwardRef } from "react";
import { cn, useIsMobile } from "@pay/utils";
import { Button, ButtonProps } from "../button.js";

interface NavbarProps extends React.ComponentProps<"nav"> {
    className?: string;
}

const Navbar = forwardRef<HTMLElement, NavbarProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <nav
                ref={ref}
                className={cn(
                    "flex items-center justify-between px-8 py-3 border-b border-border",
                    className
                )}
                {...props}
            >
                {children}
            </nav>
        );
    }
);

Navbar.displayName = "Navbar";

interface NavbarSectionProps extends React.ComponentProps<"div"> {
    className?: string;
}

const NavbarLeft = forwardRef<HTMLDivElement, NavbarSectionProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div ref={ref} className={cn("", className)} {...props}>
                {children}
            </div>
        );
    }
);

NavbarLeft.displayName = "NavbarLeft";

const NavbarMid = forwardRef<HTMLDivElement, NavbarSectionProps>(
    ({ className, children, ...props }, ref) => {
        const isMobile = useIsMobile();

        if (isMobile) {
            return (
                <div
                    ref={ref}
                    className={cn(
                        "fixed bottom-0 left-0 w-full flex items-center justify-evenly px-8 py-4 border-t border-border bg-red-500",
                        className
                    )}
                    {...props}
                >
                    {children}
                </div>
            );
        }
        return (
            <div ref={ref} className={cn("", className)} {...props}>
                {children}
            </div>
        );
    }
);

NavbarMid.displayName = "NavbarMid";

const NavbarRight = forwardRef<HTMLDivElement, NavbarSectionProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div ref={ref} className={cn("", className)} {...props}>
                {children}
            </div>
        );
    }
);

NavbarRight.displayName = "NavbarRight";

interface NavbarItemProps extends ButtonProps {
    className?: string;
}

const NavbarItem = forwardRef<HTMLButtonElement, NavbarItemProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <Button ref={ref} className={cn("rounded-full", className)} {...props}>
                {children}
            </Button>
        );
    }
);

NavbarItem.displayName = "NavbarItem";

const NavbarItemIcon = forwardRef<HTMLSpanElement, NavbarSectionProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <span ref={ref} className={cn("", className)} {...props} >{children}</span>
        );
    }
);

NavbarItemIcon.displayName = "NavbarItemIcon";




export { Navbar, NavbarLeft, NavbarMid, NavbarRight, NavbarItem, NavbarItemIcon };
