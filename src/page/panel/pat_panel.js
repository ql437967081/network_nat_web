import React from 'react';
import { Collapse } from 'antd';

const { Panel } = Collapse;

export default function PATPanel () {
    return (
        <Panel key={'pat'} header={'PAT'} />
    );
}
