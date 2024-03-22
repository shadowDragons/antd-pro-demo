// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 查询一篇文章的评论,以分页模式展示 GET /api/content/comments */
export async function CommentControllerList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.CommentControllerListParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/content/comments', {
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

/** 评论一篇文章 POST /api/content/comments */
export async function CommentControllerStore(
  body: API.CreateCommentDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/content/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除多条自己发布的评论 DELETE /api/content/comments */
export async function CommentControllerDelete(
  body: API.DeleteDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/content/comments', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询一篇文章的评论,以树形嵌套结构展示 GET /api/content/comments/tree/${param0} */
export async function CommentControllerIndex(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.CommentControllerIndexParams,
  options?: { [key: string]: any },
) {
  const { post: param0, ...queryParams } = params;
  return request<any>(`/api/content/comments/tree/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
