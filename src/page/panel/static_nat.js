import React, { useState } from 'react';
import { Button, Col, Row } from 'antd';
import GeneralContent from './general_content';

export default function StaticNAT() {
    const [result, setResult] = useState(null);

    const conf = () => {
        console.log('配置静态NAT');
        setResult('conf t\n' +
            'ip nat inside source static 192.168.1.1 200.1.1.254\n' +
            'end');
    };

    const delConf = () => {
        console.log('删除静态NAT配置');
        setResult('conf t\n' +
            'no ip nat inside source static 192.168.1.1 200.1.1.254\n' +
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
