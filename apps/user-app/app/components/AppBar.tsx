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

function NavBarItem({
    item,
    isActive,
    onClick,
    onRectChange
}: {
    item: typeof NavBarItems[number];
    isActive: boolean;
    onClick: () => void;
    onRectChange: (rect: DOMRect | null) => void;
}) {
    const ref = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (ref.current && isActive) {
            onRectChange(ref.current.getBoundingClientRect());
        }
    }, [isActive, onRectChange]);

    return (
        <Link href={item.path} onClick={onClick}>
            <NavbarItem
                ref={ref}
                className={cn(
                    "relative shadow-none z-10 text-base w-full bg-transparent text-foreground transition-all duration-300 hover:bg-foreground/5",
                    isActive && "text-background bg-foreground"
                )}
            >
                <NavbarItemIcon>
                    <item.Icon />
                </NavbarItemIcon>
                {item.name}
            </NavbarItem>
        </Link>
    );
}

export default function AppBar() {
    const currentPath = usePathname();
    const layout = useSelectedLayoutSegment();
    const [activePath, setActivePath] = useState(currentPath);
    const [activeRect, setActiveRect] = useState<DOMRect | null>(null);

    useEffect(() => {
        setActivePath(currentPath);
    }, [currentPath]);

    if (layout === "auth") {
        return null;
    }

    return (
        <Navbar>
            <NavbarLeft className="text-xl font-semibold">Pay</NavbarLeft>
            <NavbarMid className="border border-border rounded-full p-1 grid-cols-4 grid gap-1">
                {NavBarItems.map((item) => (
                    <NavBarItem
                        key={item.path}
                        item={item}
                        isActive={activePath === item.path}
                        onClick={() => setActivePath(item.path)}
                        onRectChange={setActiveRect}
                    />
                ))}
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
    );
}