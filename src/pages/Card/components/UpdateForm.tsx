import {
    ProFormDateTimePicker,
    ProFormRadio,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
    StepsForm,
    ProFormGroup,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
    FooterToolbar,
    ModalForm,
    PageContainer,
    ProDescriptions,
} from '@ant-design/pro-components';
import { Button, Drawer, message, Space } from 'antd';
import { Image } from 'antd';
import { Divider, Tag } from 'antd';
import { Select } from 'antd';
import { addRule, removeRule, rule, updateRule } from '@/services/ant-design-pro/api';
import { MinusCircleOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { CardManageControllerValue, CategoryManageControllerValue_3 } from '@/services/manage/card';

export type FormValueType = {
    target?: string;
    template?: string;
    type?: string;
    time?: string;
    frequency?: string;
} & Partial<API.RuleListItem>;

export type UpdateFormProps = {
    onCancel: (flag?: boolean, formVals?: FormValueType) => void;
    onSubmit: (values: FormValueType) => Promise<void>;
    updateModalOpen: boolean;
    values: any;
};
interface Link {
    label: string;
    href: string;
}
interface Data {
    title: string;
    link: Link;
    type: string;
    href: string | null;
}
const UpdateForm: React.FC<UpdateFormProps> = (props) => {
    const [form] = Form.useForm();
    const [type, setType] = useState('1');
    const handleChange = (val: any) => {
        setType(val);
    };

    const [initValue, setInitValue] = useState<Data>();

    const { updateModalOpen, children, onCancel, values } = props;
    useEffect(() => {
        if (!values.body) return;
        console.log(values, 'useEffect');
        const body = JSON.parse(values.body) as Data;
        setType(body.type);
        setInitValue(body);
        form.setFieldValue('link', body.link);
        // form.setFields([])
        // body.link.forEach(item => {
        //     form.setFieldValue(
        //         'link',item,
        //     )
        // });
        // form.setFieldsValue(body.link)
    }, [values]);
    console.log(values, 'values');
    const intl = useIntl();
    return (
        <ModalForm
            title={intl.formatMessage({
                id: '编辑卡片',
                defaultMessage: '编辑卡片',
            })}
            width="600px"
            initialValues={initValue}
            open={updateModalOpen}
            onFinish={async (value: any) => {
                console.log(values, 'values');
                props.onSubmit({ ...value });
            }}
            modalProps={{
                destroyOnClose: true,
                onCancel: () => {
                    onCancel();
                },
            }}
        >
            <ProFormGroup title="类型">
                <Select
                    defaultValue="导航"
                    style={{ width: 320 }}
                    onChange={handleChange}
                    options={[
                        {
                            value: '1',
                            label: '导航',
                        },
                        {
                            value: '2',
                            label: '卡片',
                        },
                    ]}
                />{' '}
            </ProFormGroup>

            {type === '1' ? (
                <div className="tw-mt-4">
                    <ProFormGroup title="导航标题">
                        <ProFormText width="md" name="title" />
                    </ProFormGroup>
                    <ProFormGroup title="导航链接">
                        <Form
                            name="dynamic_form_nest_item"
                            autoComplete="off"
                            className="tw-mb-4 tw-space-y-4"
                            form={form}
                            
                        >
                            <Form.List name="link" >
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <Space
                                                key={key}
                                                style={{ display: 'flex', marginBottom: 8 }}
                                                align="baseline"
                                            >
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'label']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Missing first name',
                                                        },
                                                    ]}
                                                >
                                                    <Input placeholder="名称" />
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'href']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Missing last name',
                                                        },
                                                    ]}
                                                >
                                                    <Input placeholder="链接" />
                                                </Form.Item>
                                                <MinusCircleOutlined onClick={() => remove(name)} />
                                            </Space>
                                        ))}
                                        <Form.Item>
                                            <Button
                                                type="dashed"
                                                onClick={() => add()}
                                                block
                                                icon={<PlusOutlined />}
                                            >
                                                Add field
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                            {/* <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item> */}
                        </Form>
                    </ProFormGroup>
                </div>
            ) : (
                <div className="tw-mt-4">
                    <ProFormGroup title="卡片标题">
                        <ProFormText width="md" name="title" />
                    </ProFormGroup>
                    <ProFormGroup title="卡片内容">
                        <ProFormText width="md" name="title" />
                    </ProFormGroup>
                    <ProFormGroup title="卡片链接">
                        <ProFormText width="md" name="title" />
                    </ProFormGroup>
                </div>
            )}
        </ModalForm>
    );
};

export default UpdateForm;
