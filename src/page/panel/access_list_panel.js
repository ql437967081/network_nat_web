import React from 'react';
import { Collapse } from 'antd';

const { Panel } = Collapse;

export default function AccessListPanel () {
    return (
        <Panel key={'access_list'} header={'用户访问控制列表'} />
    );
}
