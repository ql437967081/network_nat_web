import React, { useState } from 'react';
import { Alert, Button, Col, Form, message, Row, Space } from 'antd';
import GeneralContent from './general_content';
import AddressInput from '../input/address_input';
import { backendModeConfig } from '../../api/util/default';
import { ping } from '../../api/ping_api';

export default function Ping() {
    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(false);

    const [successMessage, setSuccessMessage] = useState(false);

    const [errorMessage, setErrorMessage] = useState(false);

    const [form] = Form.useForm();

    const clearSource = () => form.setFieldsValue({ source: null });

    const onFinish = (values) => {
        console.log('Success:', values);
        if (backendModeConfig) {
            setLoading(true);
            setSuccessMessage(false);
            setErrorMessage(false);
            const { target, source } = values;
            ping(target, source, data => {
                const { result, status } = data;
                setResult(result);
                if (status) {
                    message.success('校验成功');
                    setSuccessMessage(true);
                } else {
                    message.error('校验失败');
                    setErrorMessage(true);
                }
                setLoading(false);
            });
        } else {
            setSuccessMessage(true);
            setErrorMessage(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        message.error(errorInfo.errorFields[0].errors[0]);
    };

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
    };

    return (
        <GeneralContent result={result} loading={loading}>
            <Form form={form} {...layout} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item
                    label={'目的地址'} name={'target'}
                    rules={[{ required: true, message: '请输入目的地址' }]}
                >
                    <AddressInput />
                </Form.Item>
                <Form.Item label={'源地址'}>
                    <Space>
                        <Form.Item name={'source'} noStyle>
                            <AddressInput />
                        </Form.Item>
                        <Button htmlType="button" onClick={clearSource}>
                            清空
                        </Button>
                    </Space>
                </Form.Item>
                <Row justify="space-between">
                    <Col>
                        {successMessage && (
                            <Alert message={'校验成功'} type={'success'} />
                        )}
                        {errorMessage && (
                            <Alert message={'校验失败'} type={'error'} />
                        )}
                    </Col>
                    <Col>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            ping
                        </Button>
                    </Col>
                </Row>
            </Form>
        </GeneralContent>
    );
}
