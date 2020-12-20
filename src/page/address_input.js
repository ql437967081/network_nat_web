import React from 'react';
import { Input, InputNumber } from 'antd';

export default class AddressInput extends React.Component {
    formattedAddress = () => {
        const [a1, a2, a3, a4] = this.parsedAddress;
        return `${a1}.${a2}.${a3}.${a4}`;
    };

    triggerChange = () => {
        const { onChange } = this.props;
        if (onChange) {
            onChange(this.formattedAddress());
        }
    };

    onA1Change = value => {
        this.parsedAddress[0] = value;
        this.triggerChange();
    };

    onA2Change = value => {
        this.parsedAddress[1] = value;
        this.triggerChange();
    };

    onA3Change = value => {
        this.parsedAddress[2] = value;
        this.triggerChange();
    };

    onA4Change = value => {
        this.parsedAddress[3] = value;
        this.triggerChange();
    };

    render() {
        const { value } = this.props;
        this.parsedAddress = (value && value.length) ? value.split('.').map(s => parseInt(s)) : [0, 0, 0, 0];
        const [a1, a2, a3, a4] = this.parsedAddress;
        return (
            <Input.Group>
                <OneByte value={a1} onChange={this.onA1Change} />.
                <OneByte value={a2} onChange={this.onA2Change} />.
                <OneByte value={a3} onChange={this.onA3Change} />.
                <OneByte value={a4} onChange={this.onA4Change} />
            </Input.Group>
        );
    }
}

function OneByte({ value, onChange }) {
    return (
        <InputNumber value={value} min={0} max={255} size={'small'} style={{ width: '60px' }} onChange={onChange} />
    );
}
