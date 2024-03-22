import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Button } from 'antd';
import { FC } from 'react';

const HomeSetting: FC = () => (
    <div>
        <PageContainer
            fixedHeader
            header={{
                title: '系统设置',
                ghost: true,
                // extra: [],
            }}
            tabList={[
                {
                    tab: '站点设置',
                    key: 'system',
                    closable: false,
                },
                {
                    tab: '首页设置',
                    key: 'home',
                },
                {
                    tab: '管理员账户',
                    key: 'admin',
                },
                {
                    tab: '语言管理',
                    key: 'languages',
                },
            ]}
            footer={[
                <Button key="3">重置</Button>,
                <Button key="2" type="primary">
                    提交
                </Button>,
            ]}
        >
            <ProCard direction="column" ghost gutter={[0, 16]}>
                <ProCard style={{ height: 200 }} />
                <ProCard gutter={16} ghost style={{ height: 200 }}>
                    <ProCard colSpan={16} />
                    <ProCard colSpan={8} />
                </ProCard>
                <ProCard gutter={16} ghost style={{ height: 200 }}>
                    <ProCard colSpan={16} />
                    <ProCard colSpan={8} />
                </ProCard>
                <ProCard gutter={16} ghost style={{ height: 200 }}>
                    <ProCard colSpan={16} />
                    <ProCard colSpan={8} />
                </ProCard>
            </ProCard>
        </PageContainer>
    </div>
);
export default HomeSetting;
