import express from 'express';
import { save, history1, history } from '../controller/order.controller.js';
import { verify } from '../middleware/authenticate.js';

const router = express();
router.post("/save", verify, save);
router.get("/history", verify, history1)
router.get("/orderIdRouter/:orderId", verify, history);
export default router;