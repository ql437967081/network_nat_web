import React, {useState} from 'react';
import {Button, Col, Row} from 'antd';
import GeneralContent from './general_content';

export default function StaticRoute() {
    // conf t
    // ip route 200.1.1.0 255.255.255.0 s0/0/0
    // end
    const [result, setResult] = useState(null);

    const conf = () => {
        console.log('配置静态路由');
        setResult('conf t\n' +
            'ip route 200.1.1.0 255.255.255.0 s0/0/0\n' +
            'end');
    };

    const delConf = () => {
        console.log('删除静态路由');
        setResult('conf t\n' +
            'no ip nat inside source list 1 pool nju\n' +
            'no ip nat pool nju 200.1.1.253 200.1.1.254 p 24\n' +
            'end')
    };

    return (
        <GeneralContent result={result}>
            <Row justify="space-between" align="middle">
                <Col>
                    <Button type={'primary'} onClick={conf}>
                        配置
                    </Button>
                </Col>
                <Col>
                    <Button type={'primary'} onClick={delConf} danger>
                        删除配置
                    </Button>
                </Col>
            </Row>
        </GeneralContent>
    );
}
