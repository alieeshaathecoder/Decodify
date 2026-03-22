import {Router} from 'express'
import { generateFlowchart } from '../controllers/flowchart.controllers.js';

const router = Router ();
router.route("/flowchart").post(generateFlowchart)

export default router;