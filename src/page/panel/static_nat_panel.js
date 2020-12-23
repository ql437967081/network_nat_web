import React from 'react';
import { Collapse } from 'antd';

const { Panel } = Collapse;

export default function StaticNATPanel () {
    return (
        <Panel key={'static_nat'} header={'静态NAT'} />
    );
}
