import { Request, Response } from "express";
import db from "@pay/db/client";
import { STATUS } from "../types/index.js";
import { userIdSchema } from "../validations";

async function getUser(req: Request, res: Response): Promise<any> {
    try {
        const id = req.params.id;
        const mode = req.query.mode as string;
        const parsedId = userIdSchema.safeParse(id);
        if (!parsedId.success) {
            return res.status(STATUS.BAD_REQUEST).json({ msg: "Invalid user ID" });
        }

        const user = await db.user.findFirst({
            where: {
                id: parsedId.data,
            },
            include:
                mode === "all"
                    ? {
                        Balance: {
                            select: {
                                amount: true,
                            },
                        },
                        OnRampTransaction: {
                            select: {
                                id: true,
                                amount: true,
                                provider: true,
                                startTime: true,
                                status: true,
                            },
                        },
                        receivedTransactions: true,
                        sentTransactions: true,
                    }
                    : {},
            omit: {
                password: true,
            },
        });

        if (!user) {
            return res.status(STATUS.NOT_FOUND).json({ msg: "User not found" });
        }

        return res.status(STATUS.SUCCESS).json({ msg: "User found", user });
    } catch (error) {
        console.error("Error fetching user:", error);
        return res
            .status(STATUS.INTERNAL_SERVER_ERROR)
            .json({ msg: "Internal server error" });
    }
}


export { getUser }