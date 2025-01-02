import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@pay/ui/card";
import { Label } from "@pay/ui/label";
import { Input } from "@pay/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@pay/ui/select";
import { cn } from "@pay/utils";
import { Button } from "@pay/ui/button";

export default function AddMoney({ className }: { className?: string }) {
    return (
        <Card className={cn("rounded-3xl", className)}>
            <CardHeader>
                <CardTitle className="text-2xl font-semibold">Add Money</CardTitle>
                <CardDescription>
                    Quick and secure way to add money to your wallet
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="amount" className="text-muted-foreground">Amount</Label>
                            <Input id="amount" placeholder="0" type="number" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="bank" className="text-muted-foreground">Bank</Label>
                            <Select>
                                <SelectTrigger id="bank">
                                    <SelectValue placeholder="Select Bank" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="axis">Axis Quick</SelectItem>
                                    <SelectItem value="hdfc">HDFC True</SelectItem>
                                    <SelectItem value="icici">ICICI Fast</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    <Button>Add</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
