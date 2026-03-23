import { Router } from "express";
import { generateTimeComplexity } from "../controllers/timeComplexity.controllers.js";

const router = Router();

router.route("/timeComplexity").post(generateTimeComplexity);

export default router;