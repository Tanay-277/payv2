import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@pay/ui/card";
import { cn } from "@pay/utils";
import { Currency } from "lucide-react";

export default function BalanceCard({ className }: { className?: string }) {
	return (
		<Card className={cn("rounded-3xl relative overflow-hidden", className)}>
			<CardHeader className="space-y-2">
				<div className="flex items-center justify-between">
					<CardTitle className="text-2xl">Balance</CardTitle>
					<div className="p-2 bg-emerald-300/20 rounded-full">
						<Currency className="w-5 h-5 text-emerald-600" />
					</div>
				</div>
				<CardDescription className="text-muted-foreground">
					Total funds across all accounts
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex flex-col">
					<h1 className="text-4xl font-semibold tracking-tight font-mono">
						<span className="text-sky-500/30 mr-1 font-sans">$</span>
						2,520
					</h1>
					<div className="flex items-center mt-2 space-x-2">
						<span className="text-emerald-500 text-sm font-medium">+2.5%</span>
						<p className="text-sm text-muted-foreground">from last month</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
