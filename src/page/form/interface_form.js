import React from 'react';
import { Button, Col, Form, Row, Switch } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import AddressInput from '../address_input'

export default class InterfaceForm extends React.Component {
    state = {
        connectionId: sessionStorage.getItem('connectionId')
    };

    formRef = React.createRef();

    componentDidMount() {
        const { abbr } = this.props;
        const { connectionId } = this.state;
        console.log(`（Connection: ${connectionId}）获取接口（${abbr}）信息……`);
        this.formRef.current.setFieldsValue({
            name: 'FastEthernet0/0',
            abbr: 'f0/0',
            ip_address: {
                primary: { ip: '172.16.0.2', netmask: '255.255.255.0', mask_bit: 24 },
                secondary: []
            },
            is_open: true
        });
    }

    onFinish = (values) => {
        console.log('Success:', values);
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render() {
        const layout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <Form {...layout} ref={this.formRef} onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
                <Form.Item label={'IP地址'} name={['ip_address', 'primary', 'ip']}><AddressInput /></Form.Item>
                <Form.Item label={'子网掩码'} name={['ip_address', 'primary', 'netmask']}><AddressInput /></Form.Item>
                <Form.Item label={'端口状态'} name={'is_open'} valuePropName='checked'><Switch /></Form.Item>
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
