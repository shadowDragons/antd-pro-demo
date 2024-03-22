// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 分类查询,以分页模式展示 GET /api/manage/content/categories */
export async function SwiperManageControllerValue(options?: { [key: string]: any }) {
  return request<any>('/api/manage/content/carousels', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 添加分类 POST /api/manage/content/categories */
export async function SwiperManageControllerValue_2(
  body: API.ManageCreateCategoryDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/manage/content/carousels', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除分类,支持批量删除 DELETE /api/manage/content/categories */
export async function SwiperManageControllerValue_3(options:any) {
  return request<any>(`/api/manage/content/carousels`, {
    method: 'DELETE',
    data:options,
  });
}

/** 修改分类信息 PATCH /api/manage/content/categories */
export async function SwiperManageControllerValue_4(
  body: any,
  options?: { [key: string]: any },
) {
  return request<any>('/api/manage/content/carousels', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分类详情 GET /api/manage/content/categories/${param0} */
export async function CategoryManageControllerValue_5(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: any,
  options?: { [key: string]: any },
) {
  const { item: param0, ...queryParams } = params;
  return request<any>(`/api/manage/content/categories/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
