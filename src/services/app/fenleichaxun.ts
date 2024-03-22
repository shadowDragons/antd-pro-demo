// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 查询文章分类表,以分页形式展示 GET /api/content/categories */
export async function CategoryControllerList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.CategoryControllerListParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/content/categories', {
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

/** 查询一个文章分类的详细信息 GET /api/content/categories/${param0} */
export async function CategoryControllerDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.CategoryControllerDetailParams,
  options?: { [key: string]: any },
) {
  const { item: param0, ...queryParams } = params;
  return request<any>(`/api/content/categories/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查询文章分类表,以树形嵌套结构展示 GET /api/content/categories/tree */
export async function CategoryControllerIndex(options?: { [key: string]: any }) {
  return request<any>('/api/content/categories/tree', {
    method: 'GET',
    ...(options || {}),
  });
}
