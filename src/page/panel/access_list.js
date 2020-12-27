import React, {useState} from 'react';
import {Button, Col, Row} from 'antd';
import GeneralContent from './general_content';

export default function AccessList() {
    const [result, setResult] = useState(null);

    const conf = () => {
        console.log('配置用户访问控制列表');
        setResult('conf t\n' +
            'access-list 1 permit 192.168.1.0 0.0.0.255\n' +
            'end');
    };

    return (
        <GeneralContent result={result}>
            <Row justify="space-between" align="middle">
                <Col>
                    <Button type={'primary'} onClick={conf}>
                        配置
                    </Button>
                </Col>
            </Row>
        </GeneralContent>
    );
}
