import express from 'express';
import { accessControl, authGuard } from '../auth/auth.middleware';
import * as commentController from './comment.controller';

const router = express.Router();

/**
 * 发表评论
 */
router.post('/comments', authGuard, commentController.store);

/**
 * 回复评论
 */
router.post('/comments/:commentId/reply', authGuard, commentController.reply);

/**
 * 修改评论
 */
router.patch(
    '/comments/:commentId',
    authGuard,
    accessControl({ possession: true }),
    commentController.update
);

/**
 * 导出路由
 */
export default router;