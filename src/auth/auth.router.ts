import express from 'express';
import router from '../post/post.router';
import * as authController from './auth.controller';
import { authGuard, validateLoginData } from './auth.middleware';

/**
 * 用户登录
 */
router.post('/login', validateLoginData, authController.login);

/**
 * 定义验证登录接口
 */
router.post('/auth/validate', authGuard, authController.validate);

/**
 * 导出路由
 */

export default router;
