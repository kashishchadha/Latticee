import express from 'express';
import {getcomments} from '../controllers/comment.controller.js'
const router=express.Router();

router.get("/:postid",getcomments)
export default router