import authCtrl from "../controllers/auth.controller.js";
import express from "express";

const router = express.Router();

router.route("/api/signin").post(authCtrl.signin);

export default router;
