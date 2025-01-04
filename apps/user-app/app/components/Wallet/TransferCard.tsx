"use client";
import { Button } from "@pay/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@pay/ui/card";
import { cn } from "@pay/utils";
import { Forward } from "lucide-react";

import { fetchUser } from "../../lib/user";

const friends = ["Arthur Morgan", "Dutch", "Vito Scaletta", "Joe", "John Marston", "Niko", "Home"];

export default function TransferCard({ className }: { className?: string }) {

    const handleFetch = async () => {
        console.log("fetching");

        const resp = await fetchUser("db534300-f627-4d1c-892f-80cf5389d71a");
        console.log(resp);


    }
    return (
        <Card className={cn("rounded-3xl shadow-lg h-full relative overflow-hidden", className)}>
            <div className="absolute size-16 top-0 right-0 bg-violet-800 rounded-3xl blur-3xl -z-10"></div>
            <CardHeader className="space-y-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-semibold">Quick Transfer</CardTitle>
                    <div className="p-2 bg-violet-500/20 rounded-full cursor-pointer" onClick={() => handleFetch()} >
                        <Forward className="w-5 h-5 text-violet-600" />
                    </div>
                </div>
                <CardDescription className="text-muted-foreground">
                    Send money to your friends and family
                </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2 flex-wrap">
                {friends.map((item, i) => (
                    <Button key={i} className="rounded-full" variant="tertiary">{item}</Button>
                ))}
            </CardContent>
        </Card>
    );
}
