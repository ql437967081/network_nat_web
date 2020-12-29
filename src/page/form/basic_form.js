import React from 'react';
import { Button, Col, Form, Input, message, Row, Spin } from 'antd';
import { CheckOutlined } from "@ant-design/icons";
import { getConnection } from '../../sessionConfig';
import { backendModeConfig } from '../../api/util/default';
import { getHostname, setHostname } from '../../api/hostname_api';

export default class BasicForm extends React.Component {
    state = { loading: false, formLoading: false };

    formRef = React.createRef();

    componentDidMount() {
        const connectionId = getConnection();
        console.log(`（Connection: ${connectionId}）获取基本信息……`);
        if (backendModeConfig) {
            this.setState({ formLoading: true });
            getHostname(hostname => {
                this.setState({ formLoading: false });
                this.formRef.current.setFieldsValue({ hostname })
            });
        } else {
            this.formRef.current.setFieldsValue({ hostname: 'R1' });
        }
    }

    onFinish = (values) => {
        console.log('Success:', values);
        if (backendModeConfig) {
            this.setState({ loading: true });
            const { hostname } = values;
            setHostname(hostname, s => {
                this.setState({ loading: false });
                message.success('主机名设置成功！');
            });
        }
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        message.error(errorInfo.errorFields[0].errors[0]);
    };

    render() {
        const { loading, formLoading } = this.state;
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 10 },
        };
        const rules = [{ required: true, message: '请输入主机名' }];
        return (
            <Spin size={'large'} tip={'基本信息载入中'} spinning={formLoading}>
                <Form {...layout} ref={this.formRef} onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
                    <Form.Item label={'主机名'} name={'hostname'} rules={rules}><Input /></Form.Item>
                    <Row justify="space-between">
                        <Col />
                        <Col>
                            <Button type="primary" icon={<CheckOutlined />} htmlType="submit" loading={loading}>
                                提交
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Spin>
        );
    }
}
