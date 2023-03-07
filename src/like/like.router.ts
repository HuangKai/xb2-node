import express from 'express';
import * as likeController from './like.controller';
import { authGuard } from '../auth/auth.middleware';

const router = express.Router();

/**
 * 点赞内容
 */
router.post('/post/:postId/like', authGuard, likeController.storeUserLikePost);

/**
 * 取消点赞内容
 */
router.delete('/post/:postId/like', authGuard, likeController.destoryUserLikePost);

/**
 * 导出路由
 */
export default router;