import { Request, Response, NextFunction } from 'express';
import { POST_PER_PAGE } from '../app/app.config';

/**
 * 排序方式
 */
export const sort = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    // 获取客户端设计的排序方式
    const { sort } = request.query;

    // 排序用的 SQL
    let sqlSort: string;

    // 设置培训用的 SQL
    switch (sort) {
        case 'earliest':
            sqlSort = 'post.id ASC';
            break;
        case 'latest':
            sqlSort = 'post.id DESC';
            break;
        case 'most_comments':
            sqlSort = 'totalComments DESC, post.id ASC';
            break;
        default:
            sqlSort = 'post.id DESC';
            break;
    }

    // 在请求中添加排序
    request.sort = sqlSort;

    // 下一步
    next();
}

/**
 * 过滤列表
 */
export const filter = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    // 解构查询福
    const { tag, user, action } = request.query;

    // 设置默认的过滤
    request.filter = {
        name: 'default',
        sql: 'post.id IS NOT NULL',
    }

    // 按标签名过滤
    if (tag && !user && !action) {
        request.filter = {
            name: 'tagName',
            sql: 'tag.name = ?',
            param: `${tag}`,
        };
    }

    // 过滤出用户发布的内容
    if (user && action == 'published' && !tag) {
        request.filter = {
            name: 'userPublished',
            sql: 'user.id = ?',
            param: `${user}`,
        };
    }

    // 下一步
    next();
};

/**
 * 内容分页
 */
export const paginate = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    // 当前页码
    const { page = 1 }: any = request.query;

    // 每页内容数量
    const limit = parseInt(POST_PER_PAGE, 10) || 30;

    // 计算出偏移量
    const offset = limit * (page - 1);

    // 设置请求中的分页
    request.pagination = { limit, offset };

    // 下一步
    next();
};