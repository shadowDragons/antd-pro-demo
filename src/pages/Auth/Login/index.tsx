import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { FormattedMessage, history, SelectLang, useIntl, useModel, Helmet } from '@umijs/max';
import { Alert, message } from 'antd';

import React, { useState } from 'react';

import { AuthControllerLogin, AuthControllerProfile } from '@/services/manage/zhanghucaozuo';

import Settings from '../../../../config/defaultSettings';

const Lang = () => {
    const langClassName = useEmotionCss(({ token }) => {
        return {
            width: 42,
            height: 42,
            lineHeight: '42px',
            position: 'fixed',
            right: 16,
            borderRadius: token.borderRadius,
            ':hover': {
                backgroundColor: token.colorBgTextHover,
            },
        };
    });

    return (
        <div className={langClassName} data-lang>
            {SelectLang && <SelectLang />}
        </div>
    );
};

const LoginMessage: React.FC<{
    content: string;
}> = ({ content }) => {
    return (
        <Alert
            style={{
                marginBottom: 24,
            }}
            message={content}
            type="error"
            showIcon
        />
    );
};

const Login: React.FC = () => {
    const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
    const { initialState, setInitialState } = useModel('@@initialstate') || {};

    const containerClassName = useEmotionCss(() => {
        return {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100vh',
            overflow: 'auto',
            backgroundImage:
                "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
            backgroundSize: '100% 100%',
        };
    });

    const intl = useIntl();

    const fetchUserInfo = async () => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const userInfo = await AuthControllerProfile(null, headers);
        if (userInfo) {
            localStorage.setItem('currentUser', JSON.stringify(userInfo));

            // flushSync(() => {
            //     setInitialState((s) => ({
            //         ...s,
            //         ...userInfo,
            //         currentUser: userInfo,
            //     }));
            // });
        }
    };

    const handleSubmit = async (values: API.CredentialDto) => {
        try {
            // 登录
            const token = await AuthControllerLogin({ ...values });
            if (token) {
                localStorage.setItem('token', token.token);
                const defaultLoginSuccessMessage = intl.formatMessage({
                    id: 'pages.login.success',
                    defaultMessage: '登录成功！',
                });
                message.success(defaultLoginSuccessMessage);
                const urlParams = new URL(window.location.href).searchParams;
                await fetchUserInfo();
                history.push(urlParams.get('redirect') || '/');
                return;
            }
            const defaultLoginFailureMessage = intl.formatMessage({
                id: 'pages.login.failure',
                defaultMessage: '登录失败，请重试！123',
            });
            // 如果失败去设置用户错误信息
            // setUserLoginState('ERRor');
        } catch (error) {
            console.log(error);
            const defaultLoginFailureMessage = intl.formatMessage({
                id: 'pages.login.failure',
                defaultMessage: '登录失败，请重试！321',
            });
            message.error(defaultLoginFailureMessage);
        }
    };
    const { status } = userLoginState;

    return (
        <div className={containerClassName}>
            <Helmet>
                <title>
                    {intl.formatMessage({
                        id: 'menu.login',
                        defaultMessage: '登录页',
                    })}
                    - {Settings.title}
                </title>
            </Helmet>
            <Lang />
            <div
                style={{
                    flex: '1',
                    padding: '32px 0',
                    // background: 'blue',
                }}
            >
                <LoginForm
                    contentStyle={{
                        minWidth: 280,
                        maxWidth: '75vw',
                    }}
                    // logo={<img alt="logo" src="/admin/logo.svg" />}
                    title="后台登录"
                    subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
                    initialValues={{
                        autoLogin: true,
                    }}
                    onFinish={async (values: API.CredentialDto) => {
                        await handleSubmit(values as API.CredentialDto);
                    }}
                >
                    {status === 'error' && (
                        <LoginMessage
                            content={intl.formatMessage({
                                id: 'pages.login.accountLogin.errorMessage',
                                defaultMessage: '账户或密码错误(admin/ant.design)',
                            })}
                        />
                    )}
                    <>
                        <ProFormText
                            name="credential"
                            fieldProps={{
                                size: 'large',
                                prefix: <UserOutlined />,
                            }}
                            placeholder={intl.formatMessage({
                                id: 'pages.login.username.placeholder',
                                defaultMessage: '用户名',
                            })}
                            rules={[
                                {
                                    required: true,
                                    message: (
                                        <FormattedMessage
                                            id="pages.login.username.required"
                                            defaultMessage="请输入用户名!"
                                        />
                                    ),
                                },
                            ]}
                        />
                        <ProFormText.Password
                            name="password"
                            fieldProps={{
                                size: 'large',
                                prefix: <LockOutlined />,
                            }}
                            placeholder={intl.formatMessage({
                                id: 'pages.login.password.placeholder',
                                defaultMessage: '密码',
                            })}
                            rules={[
                                {
                                    required: true,
                                    message: (
                                        <FormattedMessage
                                            id="pages.login.password.required"
                                            defaultMessage="请输入密码！"
                                        />
                                    ),
                                },
                            ]}
                        />
                    </>
                </LoginForm>
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default Login;
