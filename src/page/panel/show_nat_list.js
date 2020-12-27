import React, { useState } from 'react';
import { Button, Col, Row } from 'antd';
import GeneralContent from './general_content';

export default function ShowNAtList(){
    const [result, setResult] = useState(null);

    const conf = () => {
        console.log('查看NAT列表');
        setResult('conf t\n' +
            'show ip nat translations\n' +
            'end');
    };

    const delConf = () => {
        console.log('清楚NAT列表');
        setResult('conf t\n' +
            'clear ip nat translation *\n' +
            'end')
    };

    return (
        <GeneralContent result={result}>
            <Row justify="space-between" align="middle">
                <Col>
                    <Button type={'primary'} onClick={conf}>
                        查看
                    </Button>
                </Col>
                <Col>
                    <Button type={'primary'} onClick={delConf} danger>
                        清空
                    </Button>
                </Col>
            </Row>
        </GeneralContent>
    );
}