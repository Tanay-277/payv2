import { Anchor } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="relative">
                <div className="absolute inset-0 bg-emerald-500/20 opacity-75 rounded-full animate-ping"></div>
                <div className="relative flex justify-center items-center h-32 w-32 bg-foreground rounded-full">
                    <Anchor className="text-background h-16 w-16" />
                </div>
            </div>
        </div>
    );
}