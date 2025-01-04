import { Request, Response } from "express";

import { STATUS } from "../types/index.js";
import { balanceId } from "../validations";

import db from "@pay/db/client";

async function getBalance(req: Request, res: Response): Promise<any> {
	try {
		const payload = balanceId.safeParse(req.params.id);
		if (!payload.success)
			return res
				.status(STATUS.BAD_REQUEST)
				.json({ msg: "Invalid Id", error: payload.error });

		const id = payload.data;

		const balance = await db.user.findFirst({
			where: {
				id: id,
			},
			include: {
				Balance: {
					select: {
						amount: true
					}
				}
			},
		});

		if (!balance) {
			return res.status(STATUS.NOT_FOUND).json({ msg: "Balance not found" });
		}

		return res
			.status(STATUS.SUCCESS)
			.json({ msg: "Balance retrieved successfully", balance });
	} catch (error) {
		return res
			.status(STATUS.INTERNAL_SERVER_ERROR)
			.json({ msg: "Internal Server Error", error });
	}
}

export { getBalance };
