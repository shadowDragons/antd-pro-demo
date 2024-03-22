import {
    ProFormSelect,
    ProFormText,
    ModalForm,
    ProForm,
    ProFormTextArea,
    ProTable,
    ProFormGroup,
    ProFormDigit,
    PageContainer
} from '@ant-design/pro-components';
import React, { useEffect, useState, useRef } from 'react';
// import { useIntl } from 'umi';
import { Form } from 'antd';
import { Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import { request } from '@umijs/max';
import { FormattedMessage, useIntl } from '@umijs/max';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { Button, Drawer, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { CategoryManageControllerValue } from '@/services/manage/fenleiguanli';
import { PostManageControllerValue_4 } from '@/services/manage/wenzhangguanli';
import { Input, Tag } from 'antd';
import {CardManageControllerValue} from '@/services/manage/card';
import ReactQuill from 'react-quill';
import { Tabs } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import type { InputRef } from 'antd';
import 'react-quill/dist/quill.snow.css';
// import { uploadMedia, getMedia } from '@/services/api/file';
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
    updateModalVisible: boolean;
    values: any;
};
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

const UpdateForm = (props: any) => {
    //
    const [tags, setTags] = useState<string[]>([]);
    const [inputVisible, setInputVisible] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<InputRef>(null);
    const [description, setDescription] = useState('');
    const [userInfo, setUserInfo] = useState<any>({
        id: '',
    });
    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus();
        }
        // const string = localStorage.getItem('currentUser') as string;
        // if(string !== undefined){
        //     const userinfo = JSON.parse(string)
        //     if(typeof userinfo === 'object'){
        //         if(!userinfo?.id) return
        //         setUserInfo(userinfo);
        //     }
        // }
        // getInitialState().then((res) => {
        //     setUserI
        // }
    }, []);
    useEffect(() => {
        console.log(userInfo, 'userInfo');
    }, [userInfo]);
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
    //   const intl = useIntl();
    const [createModalOpen, handleModalOpen] = useState<boolean>(false);
    let { updateModalOpen, children, onCancel, values } = props;
    const [form] = Form.useForm<{ name: string; company: string }>();
    const [imageUrl, setImageUrl] = useState<string>();
    const [loading, setLoading] = useState(false);
    const [logoId, setLogoId] = useState();
    const [thumbUrl, setThumbUrl] = useState<string>();
    const [thumbId, setThumbId] = useState();
    const [initValues, setInitValues] = useState<any>();
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    useEffect(() => {
        console.log(values, 'values');
        if (!values.id) return;
        PostManageControllerValue_4(values.id).then((res) => {
            setInitValues({
                author: res.author ? res.author.name : 'null',
                categories: res.categories.id,
                title: res.title,
            });
            setDescription(res.body);
            setImageUrl(
                `${SITE_URL}/api/medias/images/${values.background?.id}${values.background?.ext}`,
            );
            setThumbUrl(`${SITE_URL}/api/medias/images/${values.thumb?.id}${values.thumb?.ext}`);
            console.log(res, 'res');
        });
        // setInitValues({
        //     ...values,
        //     author: values.author.id,
        // });
        // values.author = values.author.id
        setDescription(values?.body);
    }, [values]);
    const [imageId, setImageId] = useState();
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
    const intl = useIntl();
    if (!updateModalOpen) {
        return null;
    }

    return (
        <ModalForm
            title={intl.formatMessage({
                id: '编辑文章',
                defaultMessage: '编辑文章',
            })}
            initialValues={initValues?.author}
            width="800px"
            open={updateModalOpen}
            modalProps={{
                destroyOnClose: true,
                onCancel: () => {
                    onCancel();
                },
            }}
            onFinish={props.onSubmit}
        >
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
            {/* <PageContainer */}
                {/* tabList={[
                    {
                        tab: '基本信息',
                        key: 'base',
                    },
                    {
                        tab: '详细信息',
                        key: 'info',
                    },
                ]}
            > */}
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
                
            {/* </PageContainer> */}
                
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
            <ProFormGroup title="侧边栏卡片（多选）">
                <ProFormSelect
                    request={async () => {
                        const result = await CardManageControllerValue();
                        return result.items
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
            <ProFormGroup title="关键词">
                <>
                    <div style={{ marginBottom: 16 }}>
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
                </>
            </ProFormGroup>
        </ModalForm>
    );
};

export default UpdateForm;
