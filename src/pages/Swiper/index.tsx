import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
    FooterToolbar,
    ModalForm,
    PageContainer,
    ProDescriptions,
    ProFormText,
    ProFormTextArea,
    ProTable,
    ProFormGroup,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';
import { Image } from 'antd';
import { Upload } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
// import instance from '../../services/manage'
// import { addRule, removeRule, rule, updateRule } from '@/services/ant-design-pro/api';
import { request } from '@umijs/max';

import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
// import { CategoryManageControllerValue } from '@/services/manage/fenleiguanli';
import {
    SwiperManageControllerValue,
    SwiperManageControllerValue_2,
    SwiperManageControllerValue_3,
    SwiperManageControllerValue_4,
} from '@/services/manage/swiper';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: any) => {
    const hide = message.loading('正在添加');
    try {
        console.log(fields, 'fields');
        await SwiperManageControllerValue_2({ ...fields });
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
const handleUpdate = async (fields: any) => {
    const hide = message.loading('Configuring');
    try {
        await SwiperManageControllerValue_4({
            title: fields.title,
            description: fields.description,
            id: fields.id,
            customOrder: fields.customOrder,
            link:fields.link,
            image: fields.imageId,
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
    console.log(selectedRows, 'selectedRows');
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;
    try {
        await SwiperManageControllerValue_3({
            items: [selectedRows.id],
        });
        // await removeRule({
        //     key: selectedRows.map((row) => row.key),
        // });
        hide();
        message.success('Deleted successfully and will refresh soon');
        return true;
    } catch (error) {
        hide();
        message.error('Delete failed, please try again');
        return false;
    }
};
async function uploadMedia(data: any): Promise<any> {
    const res = await request(`/api/manage/content/carousels/image`, {
        method: 'POST',
        data,
    });
    return res;
}
const TableList: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as RcFile, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
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

    const columns: ProColumns<API.RuleListItem>[] = [
        {
            title: '文章标题',
            dataIndex: 'title',
            width: 200,
            render: (entity: any) => {
                return <div>{entity}</div>;
            },
            hideInSearch: true,
        },
        {
            title: '文章标题',
            dataIndex: 'description',
            width: 200,
            render: (entity: any) => {
                return <div>{entity}</div>;
            },
            hideInSearch: true,
        },
        {
            title: <FormattedMessage id="缩略图" defaultMessage="缩略图" />,
            dataIndex: 'image',
            render: (dom: any, entity) => {
                // const res = getImageUrl(dom.id, dom.ext);
                return [
                    <div
                        onClick={() => {
                            console.log(entity);
                        }}
                    >
                        <Image
                            src={`/api/medias/images/${dom.id}${dom.ext}`}
                            alt="img"
                            width={100}
                            height={100}
                        />
                    </div>,
                ];
            },
            search: false,
        },
        {
            title: '查看',
            dataIndex: 'link',
            hideInSearch: true,
            render: (dom: any) => {
                return (
                    <a href={dom} target="_blank">
                        Link
                    </a>
                );
            },
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
                    key="delete"
                    onClick={() => {
                        handleRemove(record);
                    }}
                >
                    <FormattedMessage id="删除" defaultMessage="删除" />
                </a>,
            ],
        },
    ];
    const [imageId, setImageId] = useState();
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
                        <FormattedMessage id="添加轮播图" defaultMessage="添加轮播图" />
                    </Button>
                }
                request={async (params, sort, filter) => {
                    // params.pageNumber = params.current;
                    const getParams: any = {
                        page: params.current,
                        limit: params.pageSize,
                    };
                    const result = await SwiperManageControllerValue({ ...getParams });
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
                    id: '添加轮播图',
                    defaultMessage: '添加轮播图',
                })}
                width="500px"
                open={createModalOpen}
                onOpenChange={handleModalOpen}
                onFinish={async (value) => {
                    const success = await handleAdd({ ...value, image: imageId });
                    if (success) {
                        handleModalOpen(false);
                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    }
                }}
            >
                <ProFormGroup title="Title">
                    <ProFormText
                        rules={[
                            {
                                required: true,
                                message: (
                                    <FormattedMessage
                                        id="pages.searchTable.ruleName"
                                        defaultMessage="Rule name is required"
                                    />
                                ),
                            },
                        ]}
                        width="lg"
                        name="title"
                    />
                </ProFormGroup>
                <ProFormGroup title="Description">
                    <ProFormTextArea width="lg" name="description" />
                </ProFormGroup>
                <ProFormGroup title="Link">
                    <ProFormText
                        rules={[
                            {
                                required: true,
                                message: (
                                    <FormattedMessage
                                        id="pages.searchTable.ruleName"
                                        defaultMessage="Rule name is required"
                                    />
                                ),
                            },
                        ]}
                        width="lg"
                        name="link"
                    />
                </ProFormGroup>
                <ProFormGroup title="Image">
                    <Upload
                        name="image"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        customRequest={async ({ file, onSuccess }) => {
                            console.log(file, 'file');
                            const formData = new FormData();
                            formData.append('image', file);
                            const data = await uploadMedia(formData);
                            setImageId(data.id);
                            // @ts-ignore
                            onSuccess({ id: data.id, ext: data.ext });
                            // TODO: 上传文件的代码
                        }}
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {imageUrl ? (
                            <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                        ) : (
                            uploadButton
                        )}
                    </Upload>
                </ProFormGroup>
            </ModalForm>
            <UpdateForm
                onSubmit={async (value: any) => {
                    const success = await handleUpdate({...value});
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
