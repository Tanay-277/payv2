import express, { Router } from "express";

import { getBalance } from "../controllers/balance.controller";

const balanceRouter: Router = express.Router();

balanceRouter.get("/:id", getBalance);

export default balanceRouter;
