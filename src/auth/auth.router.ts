import express from 'express';
import router from '../post/post.router';
import * as authController from './auth.controller';
import { validateLoginData } from './auth.middleware';

/**
 * 用户登录
 */
router.post('/login', validateLoginData, authController.login);

/**
 * 导出路由
 */

export default router;