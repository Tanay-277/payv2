import z from "zod";

const balanceId = z.string().uuid();

export {balanceId}