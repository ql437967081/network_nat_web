import React from 'react';
import { Form, Input } from 'antd';

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

    render() {
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 10 },
        };
        return (
            <Form {...layout} ref={this.formRef}>
                <Form.Item label={'主机名'} name={'hostname'}><Input /></Form.Item>
            </Form>
        );
    }
}
