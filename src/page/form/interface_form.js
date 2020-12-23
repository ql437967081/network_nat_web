import React from 'react';
import { Button, Col, Form, Radio, Row, Switch } from 'antd';
import { CheckOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import AddressWithNetmaskInput from '../input/address_with_netmask_input';
import './dynamic_delete_button.css';
import { getConnection } from '../../sessionConfig';

export default class InterfaceForm extends React.Component {
    formRef = React.createRef();

    componentDidMount() {
        const { abbr } = this.props;
        const connectionId = getConnection();
        console.log(`（Connection: ${connectionId}）获取接口（${abbr}）信息……`);
        this.formRef.current.setFieldsValue({
            name: 'FastEthernet0/0',
            abbr: 'f0/0',
            ip_address: {
                primary: { ip: '172.16.0.2', netmask: '255.255.0.0', mask_bit: 16 },
                secondary: []
            },
            ip_nat: null,
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
        const { disabled } = this.props;
        const inputProps = {};
        if (disabled) inputProps['disabled'] = true;
        const layout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 21 }
        };
        const layoutWithoutLabel = {
            wrapperCol: { span: 21, offset: 3 }
        };
        const addressRules = [{ required: true, message: '请输入辅助地址' }];
        return (
            <Form {...layout} ref={this.formRef} onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
                <Form.Item label={'IP地址'} name={['ip_address', 'primary']} >
                    <AddressWithNetmaskInput {...inputProps} />
                </Form.Item>
                {!disabled && (
                    <Form.List name={['ip_address', 'secondary']}>
                        {(fields, { add, remove }, { errors }) => (
                            <>
                                {fields.map((field, index) => (
                                    <Form.Item
                                        {...(index === 0 ? layout : layoutWithoutLabel)}
                                        label={index === 0 && '辅助地址'}
                                        key={field.key}
                                    >
                                        <Form.Item
                                            {...field}
                                            validateTrigger={['onChange', 'onBlur']}
                                            rules={addressRules}
                                            noStyle
                                        >
                                            <AddressWithNetmaskInput {...inputProps} />
                                        </Form.Item>
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            onClick={() => remove(field.name)}
                                        />
                                    </Form.Item>
                                ))}
                                <Form.Item {...layoutWithoutLabel}>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        style={{ width: '60%' }}
                                        icon={<PlusOutlined />}
                                    >
                                        添加辅助地址
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                )}
                <Form.Item label={'NAT'} name={'ip_nat'}>
                    <Radio.Group {...inputProps}>
                        <Radio.Button value={null}>无</Radio.Button>
                        <Radio.Button value={'inside'}>内部地址</Radio.Button>
                        <Radio.Button value={'outside'}>外部地址</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label={'端口状态'} name={'is_open'} valuePropName='checked'>
                    <Switch {...inputProps} />
                </Form.Item>
                {!disabled && (
                    <Row justify="space-between">
                        <Col />
                        <Col>
                            <Button type="primary" icon={<CheckOutlined />} htmlType="submit">
                                提交
                            </Button>
                        </Col>
                    </Row>
                )}
            </Form>
        );
    }
}
