import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import { connection } from '../app/database/mysql';
import { createFile, findFileByName } from './file.service';

/**
 * 上传文件
 */
export const store = async (
	request: Request,
	response: Response,
	next: NextFunction,
) => {
	// 当前用户
	const { id: userId } = request.user;

	// 所属内容
	const { post: postId } = request.query;

	// 文件信息
	const fileInfo = _.pick(request.file, [
		'originalname',
		'mimetype',
		'filename',
		'size',
	]);

	try {
		// 保存文件信息
		const data = await createFile({
			...fileInfo,
			userId,
			postId: parseInt(`${postId}`, 10),
			...request.fileMetaData,
		});

		// 做出响应
		response.status(201).send(data);
	} catch (error) {
		next(error);
	}
};

/**
 * 文件服务
 */
export const serve = async (
	request: Request,
	response: Response,
	next: NextFunction,
) => {
	// 从地址参数里得到文件 ID
	const { fileId } = request.params;

	try {
		// 查找文件信息
		const file = await findFileByName(parseInt(fileId, 10));

		// 做出响应
		response.sendFile(file.filename, {
			root: 'uploads',
			headers: {
				'Content-type': file.mimetype,
			},
		});

	} catch (error) {
		next(error);
	}
};

/**
 * 文件信息
 */
export const metadata = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	// 文件 ID 
	const { fileId } = request.params;

	try {
		// 查询文件数据
		const file = await findFileByName(parseInt(fileId, 10));

		// 准备响应数据
		const data = _.pick(file, ['id', 'size', 'width', 'height', 'metadata']);

		// 做出响应
		response.send(data);
	} catch (error) {
		next();
	}
};
