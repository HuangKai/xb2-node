import express from 'express';
import router from '../post/post.router';
import * as tagController from './tag.controller';
import { authGuard } from '../auth/auth.middleware';

/**
 * 创建标签
 */
router.post('/tags', authGuard, tagController.store);

/**
 * 导出路由
 */
export default router;
