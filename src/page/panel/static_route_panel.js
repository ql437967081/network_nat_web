import React from 'react';
import { Collapse } from 'antd';

const { Panel } = Collapse;

export default function StaticRoutePanel () {
    return (
        <Panel key={'static_route'} header={'静态路由'} />
    );
}
