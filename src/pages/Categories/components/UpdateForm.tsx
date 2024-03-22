import {
    ProFormSelect,
    ProFormText,
    ModalForm,
    ProForm,
    ProFormTextArea,
    ProTable,
    ProFormGroup,
    ProFormDigit
} from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
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
    //   const intl = useIntl();
    const { updateModalOpen, children, onCancel, values } = props;
    const [form] = Form.useForm<{ name: string; company: string }>();
    const [imageUrl, setImageUrl] = useState<string>();
    const [loading, setLoading] = useState(false);
    const [logoId, setLogoId] = useState();
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    useEffect(() => {
        console.log(values, 'values');
        if (values) {
            setImageUrl(
                `${SITE_URL}/api/medias/images/${values.image?.id}${values.image?.ext}`,
            );
        }
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
    if (!updateModalOpen) {
        return null;
    }
    return (
        <ModalForm<{
            name: string;
            company: string;
        }>
            title="编辑分类"
            form={form}
            initialValues={values}
            visible={updateModalOpen}
            autoFocusFirstInput
            trigger={<>{children}</>}
            modalProps={{
                destroyOnClose: true,
                onCancel: () => {
                    onCancel();
                },
            }}
            submitTimeout={2000}
            onFinish={props.onSubmit}
        >
            <ProFormGroup title="分类名">
                <ProFormText width="md" name="name" />
            </ProFormGroup>
            <ProFormGroup title="分类排序权重">
                <ProFormDigit width="md" name="customOrder" />
            </ProFormGroup>
            {/* <ProFormTextArea width="md" name="desc" /> */}
            <ProFormGroup title="父级分类（不填则不修改）">
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
                    initialValue={values.parent}
                    width="sm"
                    name="parent"
                />
            </ProFormGroup>
        </ModalForm>
    );
};

export default UpdateForm;
