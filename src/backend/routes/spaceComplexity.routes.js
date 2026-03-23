import { Router } from "express";
import { generateSpaceComplexity } from "../controllers/spaceComplexity.controllers.js";

const router = Router();

router.route("/spaceComplexity").post(generateSpaceComplexity);

export default router;