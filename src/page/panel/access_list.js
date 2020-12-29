import React, { useState } from 'react';
import { Button, Col, message, Row } from 'antd';
import GeneralContent from './general_content';
import { backendModeConfig } from '../../api/util/default';
import { setAccessList } from '../../api/access_list_api';
import { getRouterId } from '../../sessionConfig';

export default function AccessList() {
    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(false);

    const conf = () => {
        if (getRouterId() !== 2) {
            message.error('用户访问控制列表请在R2上配置！');
            return;
        }
        console.log('配置用户访问控制列表');
        if (backendModeConfig) {
            setLoading(true);
            setAccessList(data => {
                setResult(data);
                setLoading(false);
            });
        } else {
            setResult('conf t\n' +
                'access-list 1 permit 192.168.1.0 0.0.0.255\n' +
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
