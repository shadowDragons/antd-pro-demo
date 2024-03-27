import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
    FooterToolbar,
    ModalForm,
    PageContainer,
    ProDescriptions,
    ProFormText,
    ProFormGroup,
    ProTable,
    ProFormSelect,
    ProFormDigit,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';

import { updateRule } from '@/services/ant-design-pro/api';

import {
    CategoryManageControllerValue,
    CategoryManageControllerValue_3,
    CategoryManageControllerValue_2,
} from '@/services/manage/fenleiguanli';

import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.RuleListItem) => {
    const hide = message.loading('正在添加');
    try {
        await CategoryManageControllerValue_2({ ...fields });
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

    /**
     * @en-US International configuration
     * @zh-CN 国际化配置
     * */
    const intl = useIntl();

    const columns: ProColumns<API.RuleListItem>[] = [
        // {
        //     title: '分类等级',
        //     dataIndex: 'level',
        //     renderText: (v: number) => Array(v).fill('-').join(''),
        //     hideInSearch: true,
        // },
        {
            title: '分类名称',
            tip: '同一个分类下同级别的名称是唯一的',
            dataIndex: 'name',
        },
        // {
        //     title: '文章数量',
        //     dataIndex: 'post',
        //     hideInSearch: true,
        // },
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
                    <FormattedMessage id="删除" defaultMessage="删除" />
                </a>,
            ],
        },
    ];

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
                        <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
                    </Button>
                }
                request={async (params, sort, filter) => {
                    // params.pageNumber = params.current;
                    const getParams = {
                        page: params.current,
                        limit: params.pageSize,
                    };
                    const result = await CategoryManageControllerValue({
                        ...getParams,
                        sort,
                        filter,
                    });
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
                        <FormattedMessage
                            id="pages.searchTable.batchDeletion"
                            defaultMessage="Batch deletion"
                        />
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
                    id: '新建分类',
                    defaultMessage: '新建分类',
                })}
                width="400px"
                open={createModalOpen}
                onOpenChange={handleModalOpen}
                onFinish={async (value) => {
                    const success = await handleAdd(value);
                    if (success) {
                        handleModalOpen(false);
                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    }
                }}
            >
                <ProFormGroup title="分类名">
                    <ProFormText width="md" name="name" />
                </ProFormGroup>
                <ProFormGroup title="分类排序权重">
                    <ProFormDigit width="md" name="customOrder" />
                </ProFormGroup>
                {/* <ProFormTextArea width="md" name="desc" /> */}
                <ProFormGroup title="父级分类">
                    <ProFormSelect
                        request={async () => {
                            const result = await CategoryManageControllerValue();
                            return result.items
                                .filter((item: any) => item.level !== 2)
                                .map((item: any) => {
                                    // if(parent) return
                                    return {
                                        value: item.id,
                                        label: item.name,
                                    };
                                });
                        }}
                        width="sm"
                        name="parent"
                    />
                </ProFormGroup>
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
