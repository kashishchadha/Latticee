import express from 'express';
import {getcomments,addComment} from '../controllers/comment.controller.js'
import { verifyToken } from '../middleware/verifyToken.js';
const router=express.Router();

router.get("/:postid",getcomments)
router.post("/",verifyToken,addComment);
export default router