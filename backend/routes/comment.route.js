import express from 'express';
import {getcomments,addComment,deletecomment} from '../controllers/comment.controller.js'
import { verifyToken } from '../middleware/verifyToken.js';
const router=express.Router();

router.get("/:postid",getcomments)
router.post("/",verifyToken,addComment);
router.delete("/delete/:id",verifyToken,deletecomment)
export default router