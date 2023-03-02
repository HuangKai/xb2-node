import express from 'express';
import * as postController from './post.controller';
import { requestUrl } from '../app/app.middleware';
import { authGuard, accessControl } from '../auth/auth.middleware';

const router = express.Router();

/**
 * 内容列表
 */
router.get('/posts', requestUrl, postController.index);

/**
 * 创建内容
 */
router.post('/posts', authGuard, postController.store);

/**
 * 更新内容
 */
router.patch(
	'/posts/:postId',
	authGuard,
	accessControl({ possession: true }),
	postController.update,
);

/**
 * 删除内容
 */
router.delete(
	'/posts/:postId',
	authGuard,
	accessControl({ possession: true }),
	postController.destory,
);

/**
 * 添加内容标签
 */
router.post(
	'/posts/:postId/tag',
	authGuard,
	accessControl({ possession: true }),
	postController.storePostTag
);

/**
 * 移除内容标签
 */
router.delete(
	'/posts/:postId/tag',
	authGuard,
	accessControl({ possession: true }),
	postController.destory
);

/**
 * 导出路由
 */
export default router;