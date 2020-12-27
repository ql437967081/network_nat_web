import React from 'react';
import {Button, Form} from "antd";
import AddressWithNetmaskInput from "../input/address_with_netmask_input";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";

export default class StaticNatForm extends React.Component{
    formRef = React.createRef();
    onFinish = (values) => {
        console.log('Success:', values);
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    render() {
        const layout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 21 }
        };
        const layoutWithoutLabel = {
            wrapperCol: { span: 21, offset: 3 }
        };
        const natRules = [{ required: true, message: '请输入静态NAT配置' }];
        return (
            <Form {...layout} ref={this.formRef} onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
                <Form.List name={'static_nat'}>
                    {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map((field, index) => (
                                <Form.Item
                                    {...(index === 0 ? layout : layoutWithoutLabel)}
                                    label={index === 0 && '内部转换'}
                                    key={field.key}
                                >
                                    <Form.Item
                                        {...field}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={natRules}
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
            </Form>
        );
    }
}