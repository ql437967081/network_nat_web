import React from 'react';
import { Space } from 'antd';
import AddressInput from './address_input';

export default class AddressWithNetmaskInput extends React.Component {
    state = {
        ip: null,
        netmask: null
    };

    triggerChange = changedValue => {
        const { value, onChange } = this.props;
        const { ip, netmask } = this.state;
        if (onChange) {
            onChange({
                ip,
                netmask,
                ...value,
                ...changedValue
            });
        }
    };

    onIpChange = ip => {
        this.setState({ ip });
        this.triggerChange({ ip, netmask: this.defaultNetmask(ip) });
    };

    onNetmaskChange = netmask => {
        this.setState({ netmask });
        this.triggerChange({ netmask });
    };

    defaultNetmask = ip => {
        const x = parseInt(ip.split('.')[0]);
        if (x >=  192)
            return '255.255.255.0';
        if (x >= 128)
            return '255.255.0.0';
        return '255.0.0.0';
    };

    render() {
        const { value, disabled } = this.props;
        const { ip, netmask } = this.state;

        const inputProps = {};
        if (disabled) inputProps['disabled'] = true;

        return (
            <Space>
                <AddressInput
                    value={(value && value.ip) || ip}
                    onChange={this.onIpChange}
                    {...inputProps}
                />
                （子网掩码：
                <AddressInput
                    value={(value && value.netmask) || netmask}
                    onChange={this.onNetmaskChange}
                    {...inputProps}
                />
                ）
            </Space>
        );
    }
}
