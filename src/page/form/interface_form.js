import React from 'react';
import {Form, Input} from 'antd';

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

    render() {
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 10 },
        };
        return (
            <Form {...layout} ref={this.formRef}>
                <Form.Item label={'IP地址'} name={['ip_address', 'primary', 'ip']}><Input /></Form.Item>
                <Form.Item label={'子网掩码'} name={['ip_address', 'primary', 'netmask']}><Input /></Form.Item>
                <Form.Item label={'端口状态'} name={'is_open'}><Input /></Form.Item>
            </Form>
        );
    }
}
