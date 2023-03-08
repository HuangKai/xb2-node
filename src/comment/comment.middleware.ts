import { Request, Response, NextFunction } from 'express';
import { stringify } from 'querystring';

/**
 * 过滤器
 */
export const filter = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    // 解构查询福
    const { post, user, action } = request.query;

    // 默认的过滤
    request.filter = {
        name: 'default',
        sql: 'comment.parentId IS NULL'
    };

    // 内容的评论
    if (post && !user && !action) {
        request.filter = {
            name: 'postComments',
            sql: 'comment.parentId IS NULL AND comment.postId = ?',
            param: post as string,
            // param: `${post}`,    // 字符模板也可以
            // param: post.toString()   // toString() 方法转为 string 也以
        }
    }

    // 下一步
    next();
}
