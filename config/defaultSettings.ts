import { Settings as LayoutSettings } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: LayoutSettings & {
    pwa?: boolean;
    logo?: string;
} = {
    navTheme: 'light',
    // 拂晓蓝
    colorPrimary: '#14273B',
    layout: 'mix',
    contentWidth: 'Fluid',
    fixedHeader: false,
    fixSiderbar: true,
    colorWeak: false,
    title: '移民网站管理',
    pwa: false,
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    iconfontUrl: '',
};

export default Settings;
