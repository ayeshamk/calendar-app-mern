import express from "express";

const router = express.Router();
import { requireSignin } from "../middlewares/index.js";

// controllers
import { me } from "../controllers/user.js";

router.post("/profile", requireSignin, me);

export default router;

