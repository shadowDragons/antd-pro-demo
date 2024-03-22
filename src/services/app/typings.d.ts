declare namespace API {
    type CategoryControllerDetailParams = {
        item: string;
    };

    type CategoryControllerListParams = {
        /** 当前页 */
        page?: number;
        /** 每页最大显示数 */
        limit?: number;
    };

    type CommentControllerIndexParams = {
        post: string;
    };

    type CommentControllerListParams = {
        /** 当前页 */
        page?: number;
        /** 每页最大显示数 */
        limit?: number;
        /** 评论所属文章ID:根据传入评论所属文章的ID对评论进行过滤 */
        post?: string;
    };

    type CreateCommentDto = {
        /** 评论内容 */
        body: string;
        /** 评论所属文章ID */
        post: string;
        /** 父级评论ID */
        parent: string;
    };

    type CreatePostDto = {
        /** 文章标题 */
        title: string;
        /** 文章内容 */
        body: string;
        /** 文章描述 */
        summary?: string;
        /** 发布时间:通过设置文章的发布时间来发布文章 */
        publishedAt?: string;
        /** 关键字:用于SEO */
        keywords?: string[];
        /** 关联分类ID列表:一篇文章可以关联多个分类 */
        categories?: string[];
        /** 用户侧排序:文章在用户的文章管理而非后台中,列表的排序规则 */
        userOrder?: number;
    };

    type DeleteDto = {
        /** 待删除的ID列表 */
        items: string[];
        /** 是否删除到回收站 */
        trash?: boolean;
    };

    type MediaControllerImageParams = {
        id: string;
        ext: string;
    };

    type PostControllerDetailParams = {
        item: string;
    };

    type PostControllerListParams = {
        /** 回收站数据过滤,all:包含已软删除和未软删除的数据;only:只包含软删除的数据;none:只包含未软删除的数据 */
        trashed?: 'all' | 'only' | 'none';
        /** 当前页 */
        page?: number;
        /** 每页最大显示数 */
        limit?: number;
        /** 搜索关键字:文章全文搜索字符串 */
        search?: string;
        /** 分类ID:过滤一个分类及其子孙分类下的文章 */
        category?: string;
        /** 用户ID:根据文章作者过滤文章 */
        author?: string;
        /** 发布状态:根据是否发布过滤文章状态 */
        isPublished?: boolean;
        /** 排序规则:可指定文章列表的排序规则,默认为综合排序 */
        orderBy?:
            | 'createdAt'
            | 'updatedAt'
            | 'publishedAt'
            | 'commentCount'
            | 'custom'
            | 'user-custom';
    };

    type UpdatePostDto = {
        /** 文章标题 */
        title?: string;
        /** 文章内容 */
        body?: string;
        /** 文章描述 */
        summary?: string;
        /** 发布时间:通过设置文章的发布时间来发布文章 */
        publishedAt?: string;
        /** 关键字:用于SEO */
        keywords?: string[];
        /** 关联分类ID列表:一篇文章可以关联多个分类 */
        categories?: string[];
        /** 待更新的文章ID */
        id: string;
        /** 用户侧排序:文章在用户的文章管理而非后台中,列表的排序规则 */
        userOrder?: number;
    };
}
