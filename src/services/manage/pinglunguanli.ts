// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 查询评论列表 GET /api/manage/content/comments */
export async function CommentManageControllerList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.CommentManageControllerListParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/manage/content/comments', {
    method: 'GET',
    params: {
      // page has a default value: 1
      page: '1',
      // limit has a default value: 10
      limit: '10',

      ...params,
    },
    ...(options || {}),
  });
}

/** 删除评论,支持批量删除 DELETE /api/manage/content/comments/${param0} */
export async function CommentManageControllerDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: any,
  body: API.DeleteDto,
  options?: { [key: string]: any },
) {
  const { comment: param0, ...queryParams } = params;
  return request<any>(`/api/manage/content/comments/${param0}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
