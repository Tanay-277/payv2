import express from "express";
import db from "@pay/db/client";

interface PaymentInformation {
	token: string;
	userId: string;
	amount: number;
}

const app = express();
app.use(express.json());

app.post(
	"/bankHook",
	async (req: express.Request, res: express.Response): Promise<any> => {
		const paymentInformation: PaymentInformation = {
			token: req.body.token,
			userId: req.body.userId,
			amount: req.body.amount,
		};
		try {
			const [updatedBalance, transaction] = await db.$transaction([
				db.balance.update({
					where: {
						userId: paymentInformation.userId,
					},
					data: {
						amount: {
							increment: paymentInformation.amount,
						},
					},
				}),
				db.onRampTransaction.update({
					where: {
						id: paymentInformation.userId,
						token: paymentInformation.token,
					},
					data: {
						status: "Success",
					},
				}),
			]);

			if (!updatedBalance || !transaction) {
				return res.status(501).json({
					message: "Some Error Occurred",
				});
			}

			return res.status(200).json({
				message: "Captured",
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				message: "Internal Server Error",
			});
		}
	}
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
