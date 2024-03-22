// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 用户查询,以分页模式展示 GET /api/manage/users */
export async function UserManageControllerValue(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserManageControllerValueParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/manage/users', {
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

/** 新增用户 POST /api/manage/users */
export async function UserManageControllerValue_2(
  body: API.CreateUserDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/manage/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户,支持批量删除(初始化超级管理员用户不可删除) DELETE /api/manage/users */
export async function UserManageControllerValue_3(options?: { [key: string]: any }) {
  return request<any>('/api/manage/users', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 修改用户信息 PATCH /api/manage/users */
export async function UserManageControllerValue_4(
  body: API.UpdateUserDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/manage/users', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户详情 GET /api/manage/users/${param0} */
export async function UserManageControllerValue_5(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: any,
  options?: { [key: string]: any },
) {
  const { item: param0, ...queryParams } = params;
  return request<any>(`/api/manage/users/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
