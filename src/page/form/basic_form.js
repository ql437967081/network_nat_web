import React from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import { CheckOutlined } from "@ant-design/icons";

export default class BasicForm extends React.Component {
    state = {
        connectionId: sessionStorage.getItem('connectionId')
    };

    formRef = React.createRef();

    componentDidMount() {
        const { connectionId } = this.state;
        console.log(`（Connection: ${connectionId}）获取基本信息……`);
        this.formRef.current.setFieldsValue({ hostname: 'R1' });
    }

    onFinish = (values) => {
        console.log('Success:', values);
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render() {
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 10 },
        };
        return (
            <Form {...layout} ref={this.formRef} onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
                <Form.Item label={'主机名'} name={'hostname'}><Input /></Form.Item>
                <Row justify="space-between">
                    <Col />
                    <Col>
                        <Button type="primary" icon={<CheckOutlined />} htmlType="submit">
                            提交
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}
