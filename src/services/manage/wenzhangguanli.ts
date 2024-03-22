// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 文章查询,以分页模式展示 GET /api/manage/content/posts */
export async function PostManageControllerValue(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PostManageControllerValueParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/manage/content/posts', {
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

/** 新增一篇文章 POST /api/manage/content/posts */
export async function PostManageControllerStore(
  body: any,
  options?: { [key: string]: any },
) {
  return request<any>('/api/manage/content/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除文章,支持批量删除 DELETE /api/manage/content/posts */
export async function PostManageControllerValue_2(options:any) {
  return request<any>('/api/manage/content/posts', {
    method: 'DELETE',
    data:options
  });
}

/** 修改文章 PATCH /api/manage/content/posts */
export async function PostManageControllerValue_3(
  body:any,
  options?: { [key: string]: any },
) {
  return request<any>('/api/manage/content/posts', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 文章详情 GET /api/manage/content/posts/${param0} */
export async function PostManageControllerValue_4(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: any,
  options?: { [key: string]: any },
) {
  // const { item: param0, ...queryParams } = params;
  return request<any>(`/api/manage/content/posts/${params}`, {
    method: 'GET',
    ...(options || {}),
  });
}
