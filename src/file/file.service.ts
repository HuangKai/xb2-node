import { connection } from '../app/database/mysql';
import { FileModel } from './file.model';

/**
 * 上传文件
 */
export const createFile = async (file: FileModel) => {
    // 准备查询
    const statement = `
        INSERT INTO file
        SET ?
    `;

    // 执行查询
    const [data] = await connection.promise().query(statement, file);

    // 提供数据
    return data;
};

/**
 * 按 ID 查找文件
 */
export const findFileByName = async (fileId: number) => {
    // 准备查询
    const statement = `
        SELECT * FROM file
        WHERE id = ?
    `;

    // 执行查询
    const [data] = await connection.promise().query(statement, fileId);

    // 提供数据
    return data[0];
}