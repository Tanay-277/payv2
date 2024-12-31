"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../dropdown-menu.js"
import { Switch } from "../switch.js"
import { useState } from "react";

export default function UserBtn({LogoutBtn}:any) {

    const user = {
        name: "Qu"
    }

    const handleDialog = () => {
        console.log("Handle Dialog");
    }
    const handleThemeChange = () => {
        console.log("Handle theme");
        setTheme(prevTheme => prevTheme === "dark" ? "light" : "dark");
    }

    const [theme, setTheme] = useState<string>("dark");

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="border-muted border-[0.1px] px-3 py-1 rounded-lg">{user?.name[0]}</DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
                <DropdownMenuItem onClick={handleDialog}>Profile</DropdownMenuItem>
                <DropdownMenuItem>Transactions</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="focus:bg-transparent justify-between">
                    Theme
                    <Switch checked={theme === "dark"} onCheckedChange={handleThemeChange} />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="focus:bg-transparent p-1">
                    <LogoutBtn />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
