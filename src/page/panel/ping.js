import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'antd';
import GeneralContent from './general_content';
import AddressInput from '../input/address_input';

export default function Ping() {
    const [result, setResult] = useState(null);

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
    };

    return (
        <GeneralContent result={result}>
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
                        <Button type="primary" htmlType="submit">
                            ping
                        </Button>
                    </Col>
                </Row>
            </Form>
        </GeneralContent>
    );
}
