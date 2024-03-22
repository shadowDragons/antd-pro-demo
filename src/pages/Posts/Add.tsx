import {
    FooterToolbar,
    ModalForm,
    PageContainer,
    ProDescriptions,
    ProFormText,
    ProFormSelect,
    ProFormGroup,
    ProFormTextArea,
    ProForm,
    ProTable,
} from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';
import { FormattedMessage, useIntl,history } from '@umijs/max';
import React, { useRef, useState, useEffect, useMemo, SVGProps } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { request } from '@umijs/max';
import { Input, Tag } from 'antd';
import type { InputRef } from 'antd';
import { Upload, Space } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { CategoryManageControllerValue } from '@/services/manage/fenleiguanli';
import { CardManageControllerValue } from '@/services/manage/card';
import type { UploadChangeParam } from 'antd/es/upload';
import classnames from 'classnames';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { TweenOneGroup } from 'rc-tween-one';
import { LoadingOutlined } from '@ant-design/icons';
import { Button, Drawer, message } from 'antd';
// import { history } from 'umi';

import {
    PostManageControllerValue,
    PostManageControllerStore,
    PostManageControllerValue_2,
} from '@/services/manage/wenzhangguanli';
import { Tabs } from 'antd';
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
const Add = () => {
    // const [loading, setLoading] = useState(false);

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
            setLoading2(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as RcFile, (url) => {
                setLoading2(false);
                setThumbUrl(url);
            });
        }
    };
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
    const intl = useIntl();
    const [createModalOpen, handleModalOpen] = useState<boolean>(false);
    /**
     * @en-US The pop-up window of the distribution update window
     * @zh-CN 分布更新窗口的弹窗
     * */
    // const [userInfo, setUserInfo] = useState<any>({
    //     id: '',
    // });
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
    const beforeUpload2 = (file: RcFile) => {
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

    const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const [imageId, setImageId] = useState();
    const [thumbUrl, setThumbUrl] = useState<string>();
    const [thumbId, setThumbId] = useState();
    const [showDetail, setShowDetail] = useState<boolean>(false);
    const actionRef = useRef<ActionType>();
    const [descriptionEn, setDescriptionEn] = useState('');
    const [description, setDescription] = useState('');
    const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
    const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);
    const [inputVisible, setInputVisible] = useState<boolean>(false);
    const [inputVisible2, setInputVisible2] = useState<boolean>(false);
    const [tags, setTags] = useState<string[]>([]);
    const [tags2, setTags2] = useState<string[]>([]);
    // const [inputVisible, setInputVisible] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const string = localStorage.getItem('currentUser') as string;
    const inputRef = useRef<InputRef>(null);
    const inputRef2 = useRef<InputRef>(null);
    const [username, setUsername] = useState<string>(JSON.parse(string).username);
    const [userInfo, setUserInfo] = useState<any>();
    const CustomButton = () => <span className="">button1</span>;
    const [tabType, setTabType] = useState('1');
    const enRef = useRef()
    useEffect(() => {
        // setUserInfo(JSON.parse(string));
        if (JSON.parse(string).username) {
            setUsername(JSON.parse(string).username);
        }
        if (inputVisible) {
            inputRef.current?.focus();
        }
        const button = document.querySelector('.ql-formats .ql-xbutton') as HTMLElement;
        const xinfo = document.querySelector('.ql-formats .ql-xinfo') as HTMLElement;
        const xwarning = document.querySelector('.ql-formats .ql-xwarning') as HTMLElement;
        const ebutton = document.querySelector('.enquill .ql-xbutton') as HTMLElement;
        const exinfo = document.querySelector('.enquill .ql-xinfo') as HTMLElement;
        const exwarning = document.querySelector('.enquill .ql-xwarning') as HTMLElement;
        


        button.style.width = '40px';
        button.innerText = '按钮';
        xinfo.innerText = '信息';
        xinfo.style.width = '40px';
        xwarning.innerText = '警告';
        xwarning.style.width = '40px';


        ebutton.style.width = '40px';
        ebutton.innerText = '按钮';
        exinfo.innerText = '信息';
        exinfo.style.width = '40px';
        exwarning.innerText = '警告';
        exwarning.style.width = '40px';
        stockBlot();
        // ReactQuill.defaultProps.modules
        setUserInfo(JSON.parse(string));
        // setTimeout(() => {
        //     setTabType('1')
        // }, 300);
        // getInitialState().then((res) => {
        //     setUserI
        // }
    }, [tabType]);

    useEffect(() => {
        console.log(username, 'userInfo');
    }, [username]);
    const handleClose = (removedTag: string) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        console.log(newTags);
        setTags(newTags);
    };

    const showInput = () => {
        setInputVisible(true);
    };
    const showInput2 = () => {
        setInputVisible2(true);
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
    const handleInputChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue2(e.target.value);
    };
    const handleInputConfirm = () => {
        if (inputValue && tags.indexOf(inputValue) === -1) {
            setTags([...tags, inputValue]);
        }
        setInputVisible(false);
        setInputValue('');
    };

    const handleInputConfirm2 = () => {
        if (inputValue2 && tags2.indexOf(inputValue2) === -1) {
            setTags2([...tags2, inputValue2]);
        }
        setInputVisible2(false);
        setInputValue2('');
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
    const handleClose2 = (removedTag: string) => {
        const newTags = tags2.filter((tag) => tag !== removedTag);
        console.log(newTags);
        setTags2(newTags);
    };
    const forMap2 = (tag: string) => {
        const tagElem = (
            <Tag
                closable
                onClose={(e) => {
                    e.preventDefault();
                    handleClose2(tag);
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
    const tagChildTAGS = tags2?.map(forMap2);

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    const uploadButton2 = (
        <div>
            {loading2 ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    async function uploadMedia(data: any): Promise<any> {
        const res = await request(`/api/manage/content/carousels/image`, {
            method: 'POST',
            data,
        });
        return res;
    }

    /*
     * Custom toolbar component including insertStar button and dropdowns
     */
    const CustomToolbar = () => (
        <div id="toolbar">
            <button className="ql-insertStar">
                <CustomButton />
            </button>
        </div>
    );
    const formRef = useRef();


    const stockBlot = () => {
        // 引入源码中的BlockEmbed
        const BlockEmbed = Quill.import('blots/block/embed');
        // 定义新的blot类型
        class StockEmbed extends BlockEmbed {
            static create(value: any) {
                const node = super.create(value);
                node.setAttribute('contenteditable', 'true');
                // node.setAttribute('width', '100%');
                //   设置自定义html
                node.innerHTML = value;
                return node;
            }
            // 去除字符串模板(``)语法中存在的空格
            static transformValue(value: any) {
                let handleArr = value.split('\n');
                handleArr = handleArr.map((e: any) =>
                    e.replace(/^[\s]+/, '').replace(/[\s]+$/, ''),
                );
                return handleArr.join('');
            }

            // 返回节点自身的value值 用于撤销操作
            static value(node: any) {
                return node.innerHTML;
            }
        }
        StockEmbed.blotName = 'StockEmbed';
        StockEmbed.className = 'embed-innerApp';
        StockEmbed.tagName = 'div';
        Quill.register(StockEmbed, true);
    };
    const quillRef = useRef() as any;
    function RiEmphasisCn(props: any) {
        return (
            <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
                <path
                    fill="currentColor"
                    d="M12 19a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3zm-5.5 0a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3zm11 0a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3zM13 2v2h6v2h-1.968a18.222 18.222 0 0 1-3.621 6.302a14.685 14.685 0 0 0 5.327 3.042l-.536 1.93A16.685 16.685 0 0 1 12 13.726a16.696 16.696 0 0 1-6.202 3.547l-.536-1.929a14.7 14.7 0 0 0 5.327-3.042a18.077 18.077 0 0 1-2.822-4.3h2.24A16.031 16.031 0 0 0 12 10.876A16.168 16.168 0 0 0 14.91 6H5V4h6V2h2z"
                ></path>
            </svg>
        );
    }

    function RiEnglishInput(props: SVGProps<SVGSVGElement>) {
        return (
            <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
                <path
                    fill="currentColor"
                    d="M14 10h2v.757a4.5 4.5 0 0 1 7 3.743V20h-2v-5.5c0-1.43-1.175-2.5-2.5-2.5S16 13.07 16 14.5V20h-2V10zm-2-6v2H4v5h8v2H4v5h8v2H2V4h10z"
                ></path>
            </svg>
        );
    }
    const items = [
        {
            key: '1',
            label: (
                <div className="tw-flex tw-items-center">
                    <RiEmphasisCn></RiEmphasisCn>
                    <div>中文</div>
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div className="tw-flex tw-items-center">
                    <RiEnglishInput></RiEnglishInput>
                    <div>英文</div>
                </div>
            ),
        },
    ];
    // const Xbutton = ()=>{
    //     return (
    //         <div className='.ql-xbutton'>xbutton</div>
    //     )
    // }
    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                    ['blockquote', 'code-block'],
                    [{ header: 1 }, { header: 2 }], // custom button values
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
                    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
                    [{ direction: 'rtl' }], // text direction
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    [{ link: 'unlink' }],
                    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                    [{ font: [] }],
                    [{ align: [] }],
                    ['clean'],
                    ['xbutton'],
                    ['xinfo'],
                    ['xwarning'],
                ],
                handlers: {
                    quill: undefined,
                    xbutton: function (value: any) {
                        console.log(value, 'value');
                        if (value) {
                            const quill: any = this.quill;
                            const cursorPosition: number = quill.getSelection().index;
                            // quill.setContents([{
                            //     insert:'1235',attributes:{class:'button'}
                            // }]);
                            quill.insertEmbed(
                                cursorPosition,
                                'StockEmbed',
                                `<div class="button">按钮</div>`,
                            );

                            // quill.setContents(cursorPosition, "<p class='button'>123</p>");
                            quill.setSelection(cursorPosition + 1);
                            // console.log(quillRef, 'quillRef');
                            //     const href = value.href;
                            // quillRef.current.insertText();
                            // }else{
                            //     quillRef.format('link', false);
                        }
                        // message.info({
                        //     content: '按钮插入成功',
                        //     key: 'xbutton',
                        //     duration: 2,
                        // });
                    },
                    xinfo() {
                        const quill: any = this.quill;
                        const cursorPosition: number = quill.getSelection().index;
                        quill.insertEmbed(
                            cursorPosition,
                            'StockEmbed',
                            `<div class="info">
                            <div>info</div>
                            </div>`,
                        );
                        quill.setSelection(cursorPosition + 1);
                    },
                    xwarning() {
                        const quill: any = this.quill;
                        const cursorPosition: number = quill.getSelection().index;
                        quill.insertEmbed(
                            cursorPosition,
                            'StockEmbed',
                            `<div class="warning">
                            <div>warning</div>
                            </div>`,
                        );
                        quill.setSelection(cursorPosition + 1);
                    },

                    // xinfo() {
                    //     message.info({
                    //         content: '信息插入测试中',
                    //         key: 'xinfo',
                    //         duration: 2,
                    //     });
                    // },
                    // xwarning() {
                    //     message.info({
                    //         content: '警告插入测试中',
                    //         key: 'xwarning',
                    //         duration: 2,
                    //     });
                    // },
                },
            },
        }),
        [],
    );

    useEffect(() => {
        console.log(tabType, 'tabType');

        const button = document.querySelector('.ql-xbutton') as HTMLElement;
        console.log(button, 'button');
        const xinfo = document.querySelector('.ql-xinfo') as HTMLElement;
        const xwarning = document.querySelector('.ql-xwarning') as HTMLElement;
        button.style.width = '40px';
        button.innerText = '按钮';
        xinfo.innerText = '信息';
        xinfo.style.width = '40px';
        xwarning.innerText = '警告';
        xwarning.style.width = '40px';
    }, [tabType]);

    return (
        <ProForm
            onFinish={async (values) => {
                console.log(tags, 'tags');
                // return;
                const success = await handleAdd({
                    ...values,
                    body: description,
                    body_en: descriptionEn,
                    author: userInfo.id,
                    background: imageId,
                    thumb: thumbId,
                    keywords: tags,
                    tags: tags2,
                    categories: [values.categories],
                    publishedAt: new Date(),
                    customOrder: 0,
                });
                if (success) {
                    history.push("/posts")
                    message.success('提交成功');
                }
            }}
            submitter={{
                render: (_, dom) => (
                    <FooterToolbar>
                        {dom}
                        {
                            <Button
                                type="primary"
                                onClick={() => {
                                    message.info({
                                        content: '预览文章功能测试中，请稍后',
                                        duration: 3,
                                    });
                                }}
                            >
                                预览文章
                            </Button>
                        }
                    </FooterToolbar>
                ),
            }}
            formRef={formRef}
        >
            {/* <ProFormGroup title="文章内容（预览文章开发中）"> */}
            <Tabs
                type="card"
                items={items}
                className="tw-w-full"
                onChange={(key) => {
                    setTabType(key);
                }}
            ></Tabs>
 
                <div className={classnames({ 'tw-hidden': tabType === '2' }, 'tw-w-full editor')}>
                    <ProFormGroup title="文章基本信息(CN)">
                        <ProFormTextArea label="文章标题(CN)" width={800} name="title" />
                        <ProFormTextArea label="文章简介(CN)" width={800} name="summary" />
                        <div className="text-editor tw-w-full editor">
                            {/* <CustomToolbar /> */}
                            <ReactQuill
                                theme="snow"
                                ref={quillRef}
                                value={description}
                                modules={modules}
                                onChange={setDescription}
                                className="ReactQuill tw-w-full"
                            />
                        </div>
                    </ProFormGroup>
                </div>

                <div className={classnames({ 'tw-hidden': tabType === '1' }, 'tw-w-full editor')}>
                    {' '}
                    <ProFormGroup title="文章基本信息(EN)">
                        <ProFormTextArea
                            label="文章标题(EN)"
                            placeholder={'please enter title'}
                            width={800}
                            name="title_en"
                        />
                        <ProFormTextArea
                            label="文章简介(EN)"
                            placeholder={'place enter summary'}
                            width={800}
                            name="summary_en"
                        />
                        <div className="text-editor tw-w-full">
                            {/* <CustomToolbar /> */}
                            <ReactQuill
                                theme="snow"
                                value={descriptionEn}
                                modules={modules}
                                onChange={setDescriptionEn}
                                className="ReactQuill w-full enquill"
                            />
                        </div>
                        {/* <ProFormText
                disabled
                initialValue={username?username:JSON.parse(string).username}
                width={800}
                name="author"
                label="作者"
                placeholder="请输入作者"
            /> */}
                    </ProFormGroup>
                </div>
            

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
                    beforeUpload={beforeUpload2}
                    onChange={handleChange2}
                >
                    {thumbUrl ? (
                        <img src={thumbUrl} alt="avatar" style={{ width: '100%' }} />
                    ) : (
                        uploadButton2
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
                <div style={{ marginBottom: 64 }}>
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

            <ProFormGroup title="Tags">
                <div style={{ marginBottom: 64 }}>
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
                        {tagChildTAGS}
                    </TweenOneGroup>
                </div>
                {inputVisible2 && (
                    <Input
                        ref={inputRef2}
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        value={inputValue2}
                        onChange={handleInputChange2}
                        onBlur={handleInputConfirm2}
                        onPressEnter={handleInputConfirm2}
                    />
                )}
                {!inputVisible2 && (
                    <Tag onClick={showInput2} className="site-tag-plus">
                        <PlusOutlined /> New Tag
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
                    name="cards"
                />
            </ProFormGroup>
            {/* <Space direction="vertical" style={{ width: '25%',height:'90px' }}>
            <Button  type="primary" block  style={{ height:'40px' }}>
                发布文章
            </Button>
            </Space> */}
        </ProForm>
    );
};
export default Add;
