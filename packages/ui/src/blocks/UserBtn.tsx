"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../dropdown-menu.js"
import { Switch } from "../switch.js"
import { useState } from "react";

export default function UserBtn() {

    const user = {
        name: "one"
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
            <DropdownMenuTrigger className="border-muted border-[0.1px] py-1 px-3 rounded-lg">{user?.name[0]}</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={handleDialog}>Profile</DropdownMenuItem>
                <DropdownMenuItem>Transactions</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="focus:bg-transparent justify-between">
                    Theme
                    <Switch checked={theme === "dark"} onCheckedChange={handleThemeChange} />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="focus:bg-transparent">
                    {/* <LogoutBtn /> */}
                    logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
