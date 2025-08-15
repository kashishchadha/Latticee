import express from 'express';
import {getboard} from '../controllers/board.controller.js'
const router=express.Router();

router.get("/:userid",getboard)
export default router