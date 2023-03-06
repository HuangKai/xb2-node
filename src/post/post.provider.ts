/**
 * 查询片段
 */
export const sqlFragment = {
    user: `
        JSON_OBJECT(
            'id', user.id,
            'name', user.name
        ) as user
    `,
    leftJoinUser: `
        LEFT JOIN user
                ON user.id = post.userId
    `,
    totalComments: `
        (
            SELECT
                COUNT(comment.id)
            FROM 
                comment
            WHERE
                comment.postId = post.id
        ) as totalComments
    `,
    leftJoinOneFile: `
        LEFT JOIN LATERAL (
            SELECT *
            FROM file
            WHERE file.postId = post.id
            ORDER BY file.id DESC
            LIMIT 1
        ) as file ON post.id = file.postId
    `,
    file: `
        CAST(
            IF(
                COUNT(file.id),
                GROUP_CONCAT(
                    DISTINCT JSON_OBJECT(
                        'id', file.id,
                        'width', file.width,
                        'height', file.height
                    )
                ),
                NULL
            ) AS JSON
        ) as file
    `,
    leftJoinTag: `
        LEFT JOIN
            post_tag ON post_tag.postId = post.id
        LEFT JOIN
            tag ON post_tag.tagId = tag.id
    `,
    tags: `
        CAST(
            IF(
                COUNT(tag.id),
                CONCAT(
                    '[',
                        GROUP_CONCAT(
                            DISTINCT JSON_OBJECT(
                                'id', tag.id,
                                'name',tag.name
                            )
                        ),
                    ']'
                ),
                NULL
            ) as JSON
        ) as tags
    `,
};