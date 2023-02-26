import { Request, Response, NextFunction } from 'express';
import * as userService from './user.service';

/**
 * 验证用户数据
 */
export const validateUserData = async (
    requst: Request,
    response: Response,
    next: NextFunction
) => {
    console.log('👦🏻 验证用户数据');

    // 准备数据
    const { name, password } = requst.body;

    // 验证必填数据
    if (!name) return next(new Error('NAME_IS_REQUIRED'));
    if (!password) return next(new Error('PASSWORD_IS_REQUIRED'));

    // 下一步
    next();
};