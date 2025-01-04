import express, { Router } from "express";

import { getUser } from "../controllers/user.controller.js";

const userRouter: Router = express.Router();

userRouter.get("/:id", getUser);

export default userRouter;
