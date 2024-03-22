import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
    FooterToolbar,
    ModalForm,
    PageContainer,
    ProDescriptions,
    ProFormText,
    ProFormTextArea,
    ProFormGroup,
    ProFormSelect,
    ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Drawer, message, Space } from 'antd';
import React, { useRef, useState } from 'react';
import { Image } from 'antd';
import { Divider, Tag } from 'antd';
import { Select } from 'antd';
import { addRule, removeRule, rule, updateRule } from '@/services/ant-design-pro/api';
import { MinusCircleOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
// import { CategoryManageControllerValue } from '@/services/manage/fenleiguanli';
import { CardManageControllerValue,CardgoryManageControllerValue_2, CategoryManageControllerValue_3 } from '@/services/manage/card';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: any) => {
    const hide = message.loading('正在添加');
    try {
        await CardgoryManageControllerValue_2({ ...fields });
        hide();
        message.success('Added successfully');
        return true;
    } catch (error) {
        hide();
        message.error('Adding failed, please try again!');
        return false;
    }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
    const hide = message.loading('Configuring');
    try {
        await updateRule({
            name: fields.name,
            desc: fields.desc,
            key: fields.key,
        });
        hide();

        message.success('Configuration is successful');
        return true;
    } catch (error) {
        hide();
        message.error('Configuration failed, please try again!');
        return false;
    }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: any) => {
    const hide = message.loading('正在删除');
    // console.log(selectedRows);
    if (!selectedRows) return true;
    try {
        await CategoryManageControllerValue_3({
            items: [selectedRows.id],
        });
        hide();
        message.success('Deleted successfully and will refresh soon');
        return true;
    } catch (error) {
        hide();
        message.error('Delete failed, please try again');
        return false;
    }
};

const TableList: React.FC = () => {
    /**
     * @en-US Pop-up window of new window
     * @zh-CN 新建窗口的弹窗
     *  */
    const [createModalOpen, handleModalOpen] = useState<boolean>(false);
    /**
     * @en-US The pop-up window of the distribution update window
     * @zh-CN 分布更新窗口的弹窗
     * */
    const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

    const [showDetail, setShowDetail] = useState<boolean>(false);

    const actionRef = useRef<ActionType>();
    const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
    const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);
    interface User {
        [key: string]: any;
        actived: boolean;
        createdAt: string;
        id: string;
        isCreator: boolean;
        nickname: string;
        permissions: any[];
        updatedAt: string;
        username: string;
    }
    /**
     * @en-US International configuration
     * @zh-CN 国际化配置
     * */
    const intl = useIntl();
    const [type, setType] = useState('1');
    const handleChange = (val: any) => {
        setType(val);
    };
    const columns: ProColumns<API.RuleListItem>[] = [
        {
            title: '卡片名',
            dataIndex: 'title',
            width: 200,
            render: (entity: any) => {
                return <div>{entity}</div>;
            },
            hideInSearch: true,
        },
        {
            title: '卡片类型',
            dataIndex: 'body',
            hideInSearch: true,
            render: (dom: any) => {
                if(!dom) return
                const Object = JSON.parse(dom);
                // console.log(Object, 'Object');
                return (
                    <div>
                        <Tag>{Object?.type === "1" ? 'Navigation导航栏' : 'Card卡片'}</Tag>
                    </div>
                );
            },
        },
        {
            title: '卡片预览',
            dataIndex: 'body',
            hideInSearch: true,
            render: (dom: any) => {
                return(
                    <div>-</div>
                )
            }
            // render: (dom: any) => {
            //     const Object = JSON.parse(dom);
            //     console.log(Object, 'Object');
            //     return (
            //         <div>
            //             <div>{Object.title}</div>
            //             <div>
            //                 {Object.link.map((item: any) => {
            //                     return <div>{item.label}</div>;
            //                 })}
            //             </div>
            //         </div>
            //     );
            // },
        },
        {
            title: (
                <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />
            ),
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => [
                <a
                    key="config"
                    onClick={() => {
                        handleUpdateModalOpen(true);
                        setCurrentRow(record);
                    }}
                >
                    <FormattedMessage
                        id="pages.searchTable.config"
                        defaultMessage="Configuration"
                    />
                </a>,
                <a
                    onClick={() => {
                        handleRemove(record);
                    }}
                >
                    <FormattedMessage id="删除卡片" defaultMessage="删除卡片" />
                </a>,
            ],
        },
    ];
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 },
        },
    };
    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 20, offset: 4 },
        },
    };
    const [form] = Form.useForm();
    return (
        <PageContainer>
            <ProTable<API.RuleListItem, API.PageParams>
                actionRef={actionRef}
                rowKey="key"
                options={{ reload: true, setting: false, density: false }}
                search={{
                    filterType: 'light',
                }}
                cardProps={{ bordered: true }}
                headerTitle={
                    <Button
                        type="primary"
                        key="primary"
                        onClick={() => {
                            handleModalOpen(true);
                        }}
                    >
                        <PlusOutlined />{' '}
                        <FormattedMessage id="侧栏卡片" defaultMessage="侧栏卡片" />
                    </Button>
                }
                request={async (params, sort, filter) => {
                    // params.pageNumber = params.current;
                    const getParams: any = {
                        page: params.current,
                        limit: params.pageSize,
                    };
                    const result = await CardManageControllerValue({ ...getParams });
                    return {
                        data: result.items,
                        success: true,
                        total: result.meta.totalItems,
                    };
                }}
                columns={columns}
            />
            {selectedRowsState?.length > 0 && (
                <FooterToolbar
                    extra={
                        <div>
                            <FormattedMessage
                                id="pages.searchTable.chosen"
                                defaultMessage="Chosen"
                            />{' '}
                            <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
                            <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
                            &nbsp;&nbsp;
                            <span>
                                <FormattedMessage
                                    id="pages.searchTable.totalServiceCalls"
                                    defaultMessage="Total number of service calls"
                                />{' '}
                                {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{' '}
                                <FormattedMessage
                                    id="pages.searchTable.tenThousand"
                                    defaultMessage="万"
                                />
                            </span>
                        </div>
                    }
                >
                    <Button
                        onClick={async () => {
                            await handleRemove(selectedRowsState);
                            setSelectedRows([]);
                            actionRef.current?.reloadAndRest?.();
                        }}
                    >
                        <FormattedMessage id="删除卡片" defaultMessage="删除卡片" />
                    </Button>
                    <Button type="primary">
                        <FormattedMessage
                            id="pages.searchTable.batchApproval"
                            defaultMessage="Batch approval"
                        />
                    </Button>
                </FooterToolbar>
            )}
            <ModalForm
                title={intl.formatMessage({
                    id: '新建卡片',
                    defaultMessage: '新建卡片',
                })}
                width="600px"
                open={createModalOpen}
                onOpenChange={handleModalOpen}
                onFinish={async (value) => {
                    const result = {
                        title: value.title,
                        link: type === '1'?form.getFieldValue('link'):null,
                        type:type,
                        content: value.content,
                        href: type === '2'?value.href:null,
                    }
                    console.log(result,"value新建卡片")
                    
                    const success = await handleAdd({
                        title: value.title,
                        body:JSON.stringify(result),
                        link:type === '2'?value.href:'',
                    });
                    if (success) {
                        handleModalOpen(false);
                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    }
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
                                name="link"
                                autoComplete="off"
                                className="tw-mb-4 tw-space-y-4"
                                form={form}
                            >
                                <Form.List name="link">
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
                                                    <MinusCircleOutlined
                                                        onClick={() => remove(name)}
                                                    />
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
                    <div className='tw-mt-4'>
                        <ProFormGroup title="卡片标题">
                            <ProFormText width="md" name="title" />
                        </ProFormGroup>
                        <ProFormGroup title="卡片内容">
                            <ProFormText width="md" name="content" />
                        </ProFormGroup>
                        <ProFormGroup title="卡片链接">
                            <ProFormText width="md" name="href" />
                        </ProFormGroup>
                    </div>
                )}
            </ModalForm>
            <UpdateForm
                onSubmit={async (value) => {
                    const success = await handleUpdate(value);
                    if (success) {
                        handleUpdateModalOpen(false);
                        setCurrentRow(undefined);
                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    }
                }}
                onCancel={() => {
                    handleUpdateModalOpen(false);
                    if (!showDetail) {
                        setCurrentRow(undefined);
                    }
                }}
                updateModalOpen={updateModalOpen}
                values={currentRow || {}}
            />

            <Drawer
                width={600}
                open={showDetail}
                onClose={() => {
                    setCurrentRow(undefined);
                    setShowDetail(false);
                }}
                closable={false}
            >
                {currentRow?.name && (
                    <ProDescriptions<API.RuleListItem>
                        column={2}
                        title={currentRow?.name}
                        request={async () => ({
                            data: currentRow || {},
                        })}
                        params={{
                            id: currentRow?.name,
                        }}
                        columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
                    />
                )}
            </Drawer>
        </PageContainer>
    );
};

export default TableList;
