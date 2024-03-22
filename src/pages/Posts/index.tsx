import { PlusOutlined } from '@ant-design/icons';
import type {
    ActionType,
    ProColumns,
    ProDescriptionsItemProps,
    ProForm,
} from '@ant-design/pro-components';
import {
    FooterToolbar,
    ModalForm,
    PageContainer,
    ProDescriptions,
    ProFormText,
    ProFormSelect,
    ProFormGroup,
    ProFormTextArea,
    ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useMatch, useRouteData, useRoutes } from '@umijs/max';
import { Button, Drawer, message } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import { Image } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { addRule, removeRule, rule, updateRule } from '@/services/ant-design-pro/api';
import { CategoryManageControllerValue } from '@/services/manage/fenleiguanli';
import { LoadingOutlined } from '@ant-design/icons';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { Upload } from 'antd';
import { request,useParams } from '@umijs/max';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import type { UploadChangeParam } from 'antd/es/upload';
import { Tabs } from 'antd';
import { history, Link, RequestConfig } from '@umijs/max';
// import { CategoryManageControllerValue } from '@/services/manage/fenleiguanli';
import {
    PostManageControllerValue,
    PostManageControllerStore,
    PostManageControllerValue_2,
} from '@/services/manage/wenzhangguanli';
import {CardManageControllerValue} from '@/services/manage/card';
import { Input, Tag } from 'antd';
import type { InputRef } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import { useUser } from '@/hooks/useUser';
// import { useParams } from 'umi';
import { getInitialState } from '../../app';
// import { Router } from 'express';
async function uploadMedia(data: any): Promise<any> {
    const res = await request(`/api/manage/content/carousels/image`, {
        method: 'POST',
        data,
    });
    return res;
}
interface RecordType {
    key: string;
    title: string;
    description: string;
}

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: any) => {
    const hide = message.loading('正在添加');
    try {
        await PostManageControllerStore({ ...fields });
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
        await PostManageControllerValue_2({
          items:[selectedRows.id]
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

const TableList: React.FC = (props:any) => {
    //
    const [tags, setTags] = useState<string[]>([]);
    const [inputVisible, setInputVisible] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<InputRef>(null);
    const [userInfo, setUserInfo] = useState<any>(useUser);
    useEffect(()=>{
        console.log(userInfo,"userInfo")
    }),[userInfo]
    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus();
        }
        // console.log()
        const res = useUser().then(res=>{
            console.log(res,"setUserInfo")
            setUserInfo(res.res)
            localStorage.setItem('currentUser',JSON.stringify(res.res))
        });
        const string = typeof window !== undefined ? localStorage.getItem('currentUser') :null;
        if(!string) return;
    }, []);
    const handleClose = (removedTag: string) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        console.log(newTags);
        setTags(newTags);
    };

    const showInput = () => {
        setInputVisible(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputConfirm = () => {
        if (inputValue && tags.indexOf(inputValue) === -1) {
            setTags([...tags, inputValue]);
        }
        setInputVisible(false);
        setInputValue('');
    };
    const forMap = (tag: string) => {
        const tagElem = (
            <Tag
                closable
                onClose={(e) => {
                    e.preventDefault();
                    handleClose(tag);
                }}
            >
                {tag}
            </Tag>
        );
        return (
            <span key={tag} style={{ display: 'inline-block' }}>
                {tagElem}
            </span>
        );
    };
    const tagChild = tags?.map(forMap);

    //

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
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const [imageId, setImageId] = useState();
    const [thumbUrl, setThumbUrl] = useState<string>();
    const [thumbId,setThumbId] = useState();
    const [showDetail, setShowDetail] = useState<boolean>(false);
    const [description, setDescription] = useState('');
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
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    const columns: ProColumns<API.RuleListItem>[] = [
        {
            title: '文章作者',
            dataIndex: 'author',
            render: (entity: any) => {
                return <div>{entity?.username}</div>;
            },
            hideInSearch: true,
        },
        {
            title: '分类名称',
            tip: '同一个分类下同级别的名称是唯一的',
            dataIndex: 'categories',
            render: (entity: any) => {
                return entity?.map((item: any) => {
                    console.log(item, 'categories entity');
                    return <div>{item?.name}</div>;
                });
            },
        },
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
            title: <FormattedMessage id="缩略图" defaultMessage="缩略图" />,
            dataIndex: 'thumb',
            render: (dom: any, entity) => {
                return [
                    <div>
                        <Image
                            src={`/api/medias/images/${dom?.id}${dom?.ext}`}
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
            title: '查看文章',
            dataIndex: 'post',
            hideInSearch: true,
            render: (dom: any, entity: any) => {
                return (
                    <a href={`${SITE_URL}/article/${entity?.id}`} target="_blank">
                        查看
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
            render: (_, record:any) => [
                <Link
                to={`/posts/edit?id=${record?.id}`}
                    // key="config"
                    // onClick={() => {
                    //     // handleUpdateModalOpen(true);
                    //     setCurrentRow(record);
                    //     history.push(`/article/edit?the=query`,{id:record.id});
                    //     // history.PUSH
                    // }}
                >
                    <FormattedMessage
                        id="pages.searchTable.config"
                        defaultMessage="Configuration"
                    />
                </Link>,
                <a
                    onClick={() => {
                        handleRemove(record);
                    }}
                >
                    <FormattedMessage id="删除文章" defaultMessage="删除文章" />
                </a>,
            ],
        },
    ];
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
    const getBase64 = (img: RcFile, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    };
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
    const handleChange2: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as RcFile, (url) => {
                setLoading(false);
                setThumbUrl(url);
            });
        }
    };
    const items = [
        {
          key: '1',
          label: `zh-CN`,
          children: <ReactQuill
          theme="snow"
          value={description}
          onChange={setDescription}
          className="ReactQuill w-full"
      />,
        },
        {
          key: '2',
          label: `en-US`,
          children: <ReactQuill
          theme="snow"
          value={description}
          onChange={setDescription}
          className="ReactQuill w-full"
      />,
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
                            history.push('/posts/add');
                            // handleModalOpen(true);
                        }}
                    >
                        <PlusOutlined />{' '}
                        <FormattedMessage id="添加文章" defaultMessage="添加文章" />
                    </Button>
                }
                request={async (params, sort, filter) => {
                    // params.pageNumber = params.current;
                    const getParams: any = {
                        page: params.current,
                        limit: params.pageSize,
                    };
                    const result = await PostManageControllerValue({ ...getParams });
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
                            <a style={{ fontWeight: 600 }}>{selectedRowsState?.length}</a>{' '}
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
                    id: '发布文章',
                    defaultMessage: '发布文章',
                })}
                width="800px"
                open={createModalOpen}
                onOpenChange={handleModalOpen}
                onFinish={async (value) => {
                    console.log(value,"value")
                    const success = await handleAdd({
                        ...value,
                        body: description,
                        background: imageId,
                        thumb:thumbId,
                        categories:[value.categories],
                        publishedAt:new Date(),
                        customOrder:0
                    });
                    if (success) {
                        handleModalOpen(false);
                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    }
                }}
            >
                {/* <ProFormText
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
                    width="xl"
                    name="name"
                /> */}

                <ProFormGroup title="文章基本信息">
                    <ProFormTextArea label="文章标题" width={800} name="title" />
                    <ProFormTextArea label="文章简介" width={800} name="summary" />
                    <ProFormText
                        disabled
                        initialValue={userInfo.username}
                        width={200}
                        name="author"
                        label="作者"
                        placeholder="请输入作者"
                    />
                </ProFormGroup>
                {/* <ProFormGroup title="文章内容（预览文章开发中）"> */}
                <Tabs
            type="card"
            items={items}
            >
                    <ReactQuill
                        theme="snow"
                        value={description}
                        onChange={setDescription}
                        className="ReactQuill w-full"
                    />
                    </Tabs>
                {/* </ProFormGroup> */}
                <ProFormGroup title="文章图片">
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
                            setThumbId(data.id);
                            // @ts-ignore
                            onSuccess({ id: data.id, ext: data.ext });
                            // TODO: 上传文件的代码
                        }}
                        beforeUpload={beforeUpload}
                        onChange={handleChange2}
                    >
                        {imageUrl ? (
                            <img src={thumbUrl} alt="avatar" style={{ width: '100%' }} />
                        ) : (
                            uploadButton
                        )}
                    </Upload>
                </ProFormGroup>
                <ProFormGroup title="分类">
                    <ProFormSelect
                        request={async () => {
                            const result = await CategoryManageControllerValue();
                            return result.items
                                .filter((item: any) => item.level !== 2)
                                .map((item: any) => {
                                    // if(parent) return
                                    return {
                                        value: item.id,
                                        name: item.name,
                                        label: item.name,
                                    };
                                });
                        }}
                        width={750}
                        name="categories"
                    />
                </ProFormGroup>
                <ProFormGroup title="关键词">
                    
                        <div style={{ marginBottom: 32 }}>
                            <TweenOneGroup
                                enter={{
                                    scale: 0.8,
                                    opacity: 0,
                                    type: 'from',
                                    duration: 100,
                                }}
                                onEnd={(e: any) => {
                                    if (e.type === 'appear' || e.type === 'enter') {
                                        (e.target as any).style = 'display: inline-block';
                                    }
                                }}
                                leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                                appear={false}
                            >
                                {tagChild}
                            </TweenOneGroup>
                        </div>
                        {inputVisible && (
                            <Input
                                ref={inputRef}
                                type="text"
                                size="small"
                                style={{ width: 78 }}
                                value={inputValue}
                                onChange={handleInputChange}
                                onBlur={handleInputConfirm}
                                onPressEnter={handleInputConfirm}
                            />
                        )}
                        {!inputVisible && (
                            <Tag onClick={showInput} className="site-tag-plus">
                                <PlusOutlined /> New keyword
                            </Tag>
                        )}
                    
                </ProFormGroup>
                <ProFormGroup title="侧边栏卡片（多选）">
                <ProFormSelect
                    request={async () => {
                        const result = await CardManageControllerValue();
                        return result.items
                            .filter((item: any) => item.level !== 2)
                            .map((item: any) => {
                                // if(parent) return
                                return {
                                    value: item.id,
                                    name: item.title,
                                    label: item.title,
                                };
                            });
                    }}
                    mode="multiple"
                    width={750}
                    name="card"
                />
            </ProFormGroup>
            </ModalForm>
            <UpdateForm
                onSubmit={async (value:any) => {
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
