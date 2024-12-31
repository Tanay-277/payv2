import express from "express";
import db from "@pay/db/client";

interface PaymentInformation {
	token: string;
	userId: string;
	amount: number;
}

const app = express();
app.use(express.json());

app.post("/bankHook", async (req, res) => {
	const paymentInformation: PaymentInformation = {
		token: req.body.token,
		userId: req.body.userId,
		amount: req.body.amount,
	};

	try {
		const updatedBalance = await db.balance.update({
			where: {
				userId: paymentInformation.userId,
			},
			data: {
				amount: {
					increment: paymentInformation.amount,
				},
			},
		});

		const transaction = await db.onRampTransaction.update({
			where: {
				id: paymentInformation.userId,
				token: paymentInformation.token,
			},
			data: {
				status: "Success",
			},
		});

		res.status(200).json({
			message: "Captured",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Internal Server Error",
		});
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
