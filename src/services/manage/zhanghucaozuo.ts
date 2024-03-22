// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 修改账户信息 PATCH /api/manage/auth */
export async function AuthControllerUpdate(
  body: API.UpdateAccountDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/manage/auth', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取默认头像 GET /api/manage/auth/avatar */
export async function AuthControllerDefaultAvatar(options?: { [key: string]: any }) {
  return request<any>('/api/manage/auth/avatar', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 上传头像 POST /api/manage/auth/avatar */
export async function AuthControllerUploadAvatar(
  body: API.UploadAvatarDto,
  image?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (image) {
    formData.append('image', image);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      formData.append(
        ele,
        typeof item === 'object' && !(item instanceof File) ? JSON.stringify(item) : item,
      );
    }
  });

  return request<any>('/api/manage/auth/avatar', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 用户通过凭证(可以是用户名,邮箱,手机号等)+密码登录 POST /api/manage/auth/login */
export async function AuthControllerLogin(
  body: API.CredentialDto,
  options?: { [key: string]: any },
) {
  localStorage.setItem('token',null) ;
  return request<any>('/api/manage/account/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户登出账户 POST /api/manage/auth/logout */
export async function AuthControllerLogout(options?: { [key: string]: any }) {
  return request<any>('/api/manage/auth/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 查询账户信息(只有用户自己才能查询) GET /api/manage/auth/profile */
export async function AuthControllerProfile(options?: { [key: string]: any }) {
  return request<any>('/api/manage/account/profile', {
    method: 'GET',
    ...(options || {}),
  });
}
