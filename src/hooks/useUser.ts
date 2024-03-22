import { request,useParams } from '@umijs/max';
// 获取用户信息的钩子
export const useUser = async () => {
    const res = await request('/api/manage/account/profile', {
        method: 'get',
    });
    return {
        res
    };
};
// const getUserInfo = async ()=>{
//     const res = request('/api/manage/account/profile', {
//         method: 'get'
//     })
//     console.log(res)
// }