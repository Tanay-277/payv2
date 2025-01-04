import { Request, Response } from "express";
import { transferSchema } from "../validations/transactionValidation";
import { STATUS } from "../types";
import db from "@pay/db/client";

async function transfer(req: Request, res: Response): Promise<any> {
	let transaction;
	try {
		const payload = transferSchema.safeParse(req.body);

		if (!payload.success) {
			return res
				.status(STATUS.BAD_REQUEST)
				.json({ msg: "Invalid Payload", error: payload?.error });
		}

		const { from, to, amount } = payload.data;

		const fromUser = await db.user.findUnique({
			where: { id: from },
		});
		if (!fromUser) {
			return res
				.status(STATUS.NOT_FOUND)
				.json({ msg: "Sender user not found" });
		}

		const toUser = await db.user.findUnique({
			where: { id: to },
		});
		if (!toUser) {
			return res
				.status(STATUS.NOT_FOUND)
				.json({ msg: "Recipient user not found" });
		}

		await db.$transaction(async (tx) => {
			transaction = await tx.p2PTransaction.create({
				data: {
					senderId: from,
					receiverId: to,
					amount: amount,
					status: "Pending",
				},
			});

			const sender = await tx.balance.update({
				data: {
					amount: {
						decrement: amount,
					},
				},
				where: {
					userId: from,
				},
			});

			if (sender.amount < 0) {
				throw new Error("User doesn't have enough balance to transfer");
			}

			await tx.balance.update({
				data: {
					amount: {
						increment: amount,
					},
				},
				where: {
					userId: to,
				},
			});

			transaction = await tx.p2PTransaction.update({
				data: {
					status: "Success",
				},
				where: {
					id: transaction.id,
				},
			});
		});

		return res
			.status(STATUS.SUCCESS)
			.json({ msg: "Transfer successful", transaction: transaction });
	} catch (err: any) {
		console.error("Error during transfer:", err);
		const payload = transferSchema.safeParse(req.body)
		if (payload.success) {
			await db.p2PTransaction.create({
				data: {
					senderId: payload.data.from,
					receiverId: payload.data.to,
					amount: payload.data.amount,
					status: "Failure",
				}
			});
		}

		if (err.message === "User doesn't have enough balance to transfer") {
			return res.status(STATUS.FORBIDDEN).json({
				msg: err.message,
			});
		}

		return res
			.status(STATUS.INTERNAL_SERVER_ERROR)
			.json({ msg: "Internal Server Error", error: err.message });
	}
}

export { transfer };
