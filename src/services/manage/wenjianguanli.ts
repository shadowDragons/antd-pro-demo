// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 文件查询,以分页模式展示 GET /api/manage/medias */
export async function MediaManageControllerValue(options?: { [key: string]: any }) {
  return request<any>('/api/manage/medias', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 删除文件,支持批量删除 DELETE /api/manage/medias */
export async function MediaManageControllerValue_2(options?: { [key: string]: any }) {
  return request<any>('/api/manage/medias', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 文件详情 GET /api/manage/medias/${param0} */
export async function MediaManageControllerValue_3(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: any,
  options?: { [key: string]: any },
) {
  const { item: param0, ...queryParams } = params;
  return request<any>(`/api/manage/medias/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
