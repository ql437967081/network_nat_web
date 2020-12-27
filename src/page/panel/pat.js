import React, {useState} from 'react';
import {Button, Col, Row} from 'antd';
import GeneralContent from './general_content';
import { backendModeConfig } from '../../api/util/default';
import { setPat } from '../../api/pat_api';

export default function PAT() {
    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(false);

    const conf = () => {
        console.log('配置PAT');
        if (backendModeConfig) {
            setLoading(true);
            setPat(data => {
                setResult(data);
                setLoading(false);
            });
        } else {
            setResult('conf t\n' +
                'ip nat pool nju 200.1.1.253 200.1.1.253 p 24\n' +
                'ip nat inside source list 1 pool nju overload\n' +
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
