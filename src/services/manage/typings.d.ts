declare namespace API {
    type CommentManageControllerListParams = {
        /** 当前页 */
        page?: number;
        /** 每页最大显示数 */
        limit?: number;
        /** 评论发布者ID:根据传入评论发布者的ID对评论进行过滤 */
        user?: string;
        /** 评论所属文章ID:根据传入评论所属文章的ID对评论进行过滤 */
        post?: string;
    };

    type CreateUserDto = {
        /** 用户名 */
        username: string;
        /** 昵称:不设置则为用户名 */
        nickname?: string;
        /** 手机号:必须是区域开头的,比如+86.15005255555 */
        phone: string;
        /** 邮箱地址:必须符合邮箱地址规则 */
        email: string;
        /** 用户密码:密码必须由小写字母,大写字母,数字以及特殊字符组成 */
        password: string;
        /** 用户激活状态(无法禁用第一个超级管理员用户) */
        actived?: boolean;
        /** 用户关联的角色ID列表 */
        roles?: string[];
        /** 用户直接关联的权限ID列表 */
        permissions?: string[];
    };

    type CredentialDto = {
        /** 登录凭证:可以是用户名,手机号,邮箱地址 */
        credential: string;
        /** 用户密码:密码必须由小写字母,大写字母,数字以及特殊字符组成 */
        password: string;
    };

    type DeleteDto = {
        /** 待删除的ID列表 */
        items: string[];
        /** 是否删除到回收站 */
        trash?: boolean;
    };

    type ManageCreateCategoryDto = {
        /** 分类名称:同一个父分类下的同级别子分类名称具有唯一性 */
        name: string;
        /** 父分类ID */
        parent: string;
        /** 自定义排序:该排序仅生效于同一父分类的同级别下的子分类(包括顶级分类) */
        customOrder: number;
    };

    type ManageCreatePostDto = {
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
        /** 文章作者ID:可用于在管理员发布文章时分配给其它用户,如果不设置,则作者为当前管理员 */
        author?: string;
        /** 自定义排序 */
        customOrder?: number;
    };

    type ManageUpdateCategoryDto = {
        /** 分类名称:同一个父分类下的同级别子分类名称具有唯一性 */
        name?: string;
        /** 父分类ID */
        parent?: string;
        /** 自定义排序:该排序仅生效于同一父分类的同级别下的子分类(包括顶级分类) */
        customOrder?: number;
        /** 待更新的分类ID */
        id: string;
    };

    type ManageUpdatePostDto = {
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
        /** 文章作者ID:可用于在管理员发布文章时分配给其它用户,如果不设置,则作者为当前管理员 */
        author?: string;
        /** 自定义排序 */
        customOrder?: number;
        /** 待更新的文章ID */
        id: string;
    };

    type PostManageControllerValueParams = {
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

    type RestoreDto = {
        /** 待恢复的ID列表 */
        items: string[];
    };

    type UpdateAccountDto = {
        /** 用户名 */
        username: string;
        /** 昵称:不设置则为用户名 */
        nickname?: string;
    };

    type UpdateUserDto = {
        /** 用户名 */
        username?: string;
        /** 昵称:不设置则为用户名 */
        nickname?: string;
        /** 手机号:必须是区域开头的,比如+86.15005255555 */
        phone?: string;
        /** 邮箱地址:必须符合邮箱地址规则 */
        email?: string;
        /** 用户密码:密码必须由小写字母,大写字母,数字以及特殊字符组成 */
        password?: string;
        /** 用户激活状态(无法禁用第一个超级管理员用户) */
        actived?: boolean;
        /** 用户关联的角色ID列表 */
        roles?: string[];
        /** 用户直接关联的权限ID列表 */
        permissions?: string[];
        /** 待更新的用户ID */
        id: string;
    };

    type UploadAvatarDto = {
        /** 品牌,联盟,商品等logo和封面图 */
        image: string;
    };

    type UserManageControllerValueParams = {
        /** 回收站数据过滤,all:包含已软删除和未软删除的数据;only:只包含软删除的数据;none:只包含未软删除的数据 */
        trashed?: 'all' | 'only' | 'none';
        /** 当前页 */
        page?: number;
        /** 每页最大显示数 */
        limit?: number;
        /** 角色ID:根据角色来过滤用户 */
        role?: string;
        /** 权限ID:根据权限来过滤用户(权限包含用户关联的所有角色的权限以及直接关联的权限) */
        permission?: string;
        /** 根据是否激活来过滤用户 */
        actived?: boolean;
        /** 排序规则:可指定用户列表的排序规则,默认为按创建时间降序排序 */
        orderBy?: 'createdAt' | 'updatedAt';
    };
}
