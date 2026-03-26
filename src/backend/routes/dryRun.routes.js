import {Router} from "express";
import {createDryRun} from "../controllers/dryRun.contollers.js";

const router = Router();

router.route("/dryRun").post(createDryRun);

export default router;