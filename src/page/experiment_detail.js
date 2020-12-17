import React from 'react';
import { Collapse, Image } from 'antd';
import topography from './NAT网络拓扑.png';

const { Panel } = Collapse;

export default function ExperimentDetail () {
    return (
        <Collapse defaultActiveKey={'topology'}>
            <Panel header={'实验拓扑'} key={'topology'}>
                <Image src={topography} />
            </Panel>
            <Panel header={'实验步骤'} key={'step'}>
                步骤1：。。。。。
            </Panel>
        </Collapse>
    );
}
