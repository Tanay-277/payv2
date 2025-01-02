import { Card, CardContent, CardHeader, CardTitle } from "@pay/ui/card";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@pay/ui/table";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@pay/ui/select";
import { Badge } from "@pay/ui/badge";
import { cn } from "@pay/utils";
import { Anchor, CircleAlert, CircleCheck, CircleX, Search } from "lucide-react";
import { memo } from "react";
import { Button } from "@pay/ui/button";

interface RecentTransactionProps {
	className?: string;
}

interface Transactions {
	bank: string;
	name: string;
	date: string;
	amount: string;
	status: "success" | "pending" | "failed";
	type: "credited" | "debited";
}

const transactions: Transactions[] = [
	{
		bank: "HDFC",
		name: "Arthur Morgan",
		date: "1 January",
		amount: "$45.25",
		status: "success",
		type: "credited",
	},
	{
		bank: "SBI",
		name: "John Marston",
		date: "5 February",
		amount: "$75.00",
		status: "pending",
		type: "debited",
	},
	{
		bank: "ICICI",
		name: "Dutch van der Linde",
		date: "10 March",
		amount: "$150.50",
		status: "failed",
		type: "debited",
	},
	{
		bank: "Axis",
		name: "Sadie Adler",
		date: "15 April",
		amount: "$200.00",
		status: "success",
		type: "credited",
	},
	{
		bank: "Kotak",
		name: "Charles Smith",
		date: "20 May",
		amount: "$300.75",
		status: "pending",
		type: "debited",
	},
	{
		bank: "Yes Bank",
		name: "Micah Bell",
		date: "25 June",
		amount: "$400.00",
		status: "failed",
		type: "debited",
	},
];

const RecentTransaction = memo(({ className }: RecentTransactionProps) => {
	return (
		<Card className={cn("rounded-3xl max-h-80 overflow-hidden", className)}>
			<CardHeader className="space-y-0.5">
				<div className="flex items-center justify-between">
					<CardTitle className="text-2xl">Recent Transactions</CardTitle>
					<div className="flex item-center gap-2">
						<Button className="rounded-full" size="icon" variant="tertiary">
							<Search />
						</Button>
						<Select>
							<SelectTrigger className="w-fit rounded-full bg-primary-foreground text-foreground hover:bg-primary-foreground/50">
								<SelectValue placeholder="sort by" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="date">Date</SelectItem>
								<SelectItem value="status">Status</SelectItem>
								<SelectItem value="alpha">Alphabetical</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			</CardHeader>
			<CardContent className="max-h-64 overflow-auto scroll-none">
				<Table>
					{transactions.length === 0 ? (
						<TableCaption className="caption-top">
							<div className="flex flex-col items-center justify-center py-10">
								<Anchor className="w-16 h-16 text-gray-400" />
								<p className="mt-4 text-lg font-medium text-gray-600">
									No recent transactions found
								</p>
								<p className="text-sm text-gray-500">
									Your recent transactions will appear here once you make a
									transaction.
								</p>
							</div>
						</TableCaption>
					) : (
						<>
							<TableHeader>
								<TableRow className="hover:bg-transparent">
									<TableHead className="w-[100px]">Bank</TableHead>
									<TableHead>Name</TableHead>
									<TableHead>Date</TableHead>
									<TableHead>Amount</TableHead>
									<TableHead className="text-right">Status</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody className="overflow-y-auto max-h-20">
								{transactions.map((transaction, index) => (
									<TableRow key={index}>
										<TableCell>{transaction.bank}</TableCell>
										<TableCell className="font-medium">
											{transaction.name}
										</TableCell>
										<TableCell className="font-medium">
											{transaction.date}
										</TableCell>
										<TableCell
											className={
												transaction.type === "credited" ? "text-green-600" : ""
											}
										>
											{transaction.type === "credited"
												? `${transaction.amount}`
												: transaction.amount}
										</TableCell>
										<TableCell className="place-self-end w-[100px]">
											<StatusBadge
												type={transaction.status as StatusBadgeType}
											/>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</>
					)}
				</Table>
			</CardContent>
		</Card>
	);
});

RecentTransaction.displayName = "RecentTransaction";

type StatusBadgeType = "success" | "pending" | "failed";

interface StatusBadgeProps {
	type: StatusBadgeType;
}

const STATUS_CONFIGS = {
	success: {
		label: "Success",
		icon: <CircleCheck />,
		className: "bg-green-100 text-green-800 hover:bg-green-200",
	},
	pending: {
		label: "Pending",
		icon: <CircleAlert />,
		className: "bg-yellow-200 text-yellow-800 hover:bg-yellow-200",
	},
	failed: {
		label: "Failed",
		icon: <CircleX />,
		className: "bg-red-100 text-red-800 hover:bg-red-200",
	},
} as const;

const StatusBadge = memo(({ type }: StatusBadgeProps) => {
	const config = STATUS_CONFIGS[type];

	return (
		<Badge
			variant="secondary"
			className={cn(
				config.className,
				"rounded-full font-medium capitalize place-self-end",
				"transition-colors duration-200 flex gap-1"
			)}
		>
			{config.label}
			{config.icon}
		</Badge>
	);
});

StatusBadge.displayName = "StatusBadge";

export default RecentTransaction;
export { StatusBadge };
