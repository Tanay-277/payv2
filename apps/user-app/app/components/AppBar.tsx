"use client";

import { cn } from "@pay/utils";
import Link from "next/link";
import { motion } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import UserBtn from "./UserBtn";
import { ChartArea, GitGraph, Home, Landmark, LucideIcon } from "lucide-react";
import {
    Navbar,
    NavbarLeft,
    NavbarMid,
    NavbarRight,
    NavbarItem,
    NavbarItemIcon,
} from "@pay/ui/blocks";

const NavBarItems: {
    Icon: LucideIcon;
    path: string;
    name: string;
}[] = [
    {
        Icon: Home,
        path: "/",
        name: "Dashboard",
    },
    {
        Icon: GitGraph,
        path: "/transaction",
        name: "Transactions",
    },
    {
        Icon: ChartArea,
        path: "/analytics",
        name: "Analytics",
    },
    {
        Icon: Landmark,
        path: "/services",
        name: "Services",
    },
];

function useClientRect() {
    const [rect, setRect] = useState<DOMRect | null>(null);
    const ref = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (ref.current) {
            setRect(ref.current.getBoundingClientRect());
        }
    }, []);

    return [rect, ref] as const;
}

export default function AppBar() {
    const currentPath = usePathname();
    const layout = useSelectedLayoutSegment();
    const [activePath, setActivePath] = useState(currentPath);
    const [activeRect, setActiveRect] = useState<DOMRect | null>(null);

    if (layout === "auth") {
        return null;
    }

    return (
        <>
            <Navbar>
                <NavbarLeft className="text-xl font-semibold">Pay</NavbarLeft>
                <NavbarMid className="border border-border rounded-full p-1 grid-cols-4 grid gap-1">
                    {NavBarItems.map((item, index) => {
                        const [rect, ref] = useClientRect();

                        useEffect(() => {
                            if (activePath === item.path && rect) {
                                setActiveRect(rect);
                            }
                        }, [activePath, rect]);

                        return (
                            <Link
                                href={item.path}
                                key={index}
                                onClick={() => setActivePath(item.path)}
                            >
                                <NavbarItem
                                    ref={ref}
                                    className={cn(
                                        "relative z-10 text-base w-full bg-transparent text-foreground transition-all duration-300 hover:bg-foreground/5",
                                        activePath === item.path && "text-background bg-foreground"
                                    )}
                                >
                                    <NavbarItemIcon>
                                        <item.Icon />
                                    </NavbarItemIcon>
                                    {item.name}
                                </NavbarItem>
                            </Link>
                        );
                    })}
                    {activeRect && (
                        <motion.div
                            className="absolute bg-foreground rounded-full"
                            initial={false}
                            animate={{
                                left: activeRect.left,
                                top: activeRect.top,
                                width: activeRect.width,
                                height: activeRect.height,
                            }}
                            transition={{ type: "spring", stiffness: 600, damping: 50 }}
                        />
                    )}
                </NavbarMid>
                <NavbarRight>
                    <UserBtn />
                </NavbarRight>
            </Navbar>
        </>
    );
}