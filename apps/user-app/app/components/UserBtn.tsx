"use client"
import { Avatar, AvatarFallback } from "@pay/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@pay/ui/dropdown-menu"
import { Switch } from "@pay/ui/switch"
import LogoutBtn from "./LogoutBtn"
import { useState, useCallback } from "react"
import { useSession } from "next-auth/react"
import { cn } from "@pay/utils"

export default function UserBtn() {
    const { data, status } = useSession({ required: true })

    const [theme, setTheme] = useState<string>("dark")

    const handleDialog = useCallback(() => {
        console.log("Handle Dialog")
    }, [])

    const handleThemeChange = useCallback(() => {
        setTheme(prevTheme => {
            document.body.classList.toggle("dark", prevTheme !== "dark")
            return prevTheme === "dark" ? "light" : "dark"
        })
    }, [])

    const user = data?.user

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="border-border border-[0.1px] rounded-full aspect-square">
                <Avatar className={cn("bg-transparent transition-colors duration-300 ease-linear", status === "loading" && "bg-foreground")}>
                    <AvatarFallback>{user?.name?.[0] ?? "X"}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-background/10 backdrop-blur-xl">
                <DropdownMenuItem onClick={handleDialog}>Profile</DropdownMenuItem>
                <DropdownMenuItem>Transactions</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="focus:bg-transparent justify-between">
                    Theme
                    <Switch checked={theme === "dark"} onCheckedChange={handleThemeChange} />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="focus:bg-transparent p-1">
                    <LogoutBtn/>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
