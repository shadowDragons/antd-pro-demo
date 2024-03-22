// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 查询文章列表,分页展示 GET /api/content/posts */
export async function PostControllerList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PostControllerListParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/content/posts', {
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

/** 新增一篇文章 POST /api/content/posts */
export async function PostControllerStore(
  body: API.CreatePostDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/content/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改一篇文章的信息(必须是文章作者) PATCH /api/content/posts */
export async function PostControllerUpdate(
  body: API.UpdatePostDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/content/posts', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询文章详情 GET /api/content/posts/${param0} */
export async function PostControllerDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PostControllerDetailParams,
  options?: { [key: string]: any },
) {
  const { item: param0, ...queryParams } = params;
  return request<any>(`/api/content/posts/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除文章(必须是文章作者),支持批量删除 DELETE /api/content/posts/${param0} */
export async function PostControllerDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: any,
  body: API.DeleteDto,
  options?: { [key: string]: any },
) {
  const { item: param0, ...queryParams } = params;
  return request<any>(`/api/content/posts/${param0}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
