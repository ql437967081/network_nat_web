import React from 'react';
import { Collapse } from 'antd';

const { Panel } = Collapse;

export default function DynamicNATPanel () {
    return (
        <Panel key={'dynamic_nat'} header={'动态NAT'} />
    );
}
