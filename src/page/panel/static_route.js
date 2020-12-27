import React, {useState} from 'react';
import {Button, Col, Row} from 'antd';
import GeneralContent from './general_content';
import { backendModeConfig } from '../../api/util/default';
import { setStaticRoute } from '../../api/static_route_api';

export default function StaticRoute() {
    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(false);

    const conf = () => {
        console.log('配置静态路由');
        if (backendModeConfig) {
            setLoading(true);
            setStaticRoute(data => {
                setResult(data);
                setLoading(false);
            });
        } else {
            setResult('conf t\n' +
                'ip route 200.1.1.0 255.255.255.0 s0/0/0\n' +
                'end');
        }
    };

    return (
        <GeneralContent result={result} loading={loading}>
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
