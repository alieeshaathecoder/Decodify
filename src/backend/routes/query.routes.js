import {Router} from 'express'
import { explainQuery } from '../controllers/query.controllers.js';

const router = Router();

router.route("/explain").post(explainQuery);

export default router;
