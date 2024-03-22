// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取图片 GET /api/medias/images/${param0}.${param1} */
export async function MediaControllerImage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MediaControllerImageParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ext: param1, ...queryParams } = params;
  return request<any>(`/api/medias/images/${param0}.${param1}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
