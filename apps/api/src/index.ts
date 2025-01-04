import express, { Application, Request, Response, NextFunction } from "express";

import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import { userRouter,transactions,balanceRouter } from "./routes";

dotenv.config();

const app: Application = express();

app.use(helmet());
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(cookieParser())

app.get("/", async (_, res: Response): Promise<any> => {
    return res.json({ msg: "Server is up!" });
});

// app.use((req, res, next) => {
//     validateToken(req, res, next).catch(next);
// });

app.use("/api/v2/user", userRouter);
app.use("/api/v2/transaction", transactions)
app.use("/api/v2/balance", balanceRouter)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`[server] : Server is running at http://localhost:${PORT}`);
});