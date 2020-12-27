import React, { useState } from 'react';
import { Button, Col, Form, message, Row } from 'antd';
import GeneralContent from './general_content';
import AddressInput from '../input/address_input';
import { backendModeConfig } from '../../api/util/default';
import { ping } from '../../api/ping_api';

export default function Ping() {
    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        console.log('Success:', values);
        if (backendModeConfig) {
            setLoading(true);
            const { target, source } = values;
            ping(target, source, data => {
                setResult(data);
                setLoading(false);
            });
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
            <Form {...layout} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item
                    label={'目的地址'} name={'target'}
                    rules={[{ required: true, message: '请输入目的地址' }]}
                >
                    <AddressInput />
                </Form.Item>
                <Form.Item
                    label={'源地址'} name={'source'}
                >
                    <AddressInput />
                </Form.Item>
                <Row justify="space-between">
                    <Col />
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
