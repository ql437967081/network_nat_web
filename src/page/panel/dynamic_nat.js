import React, { useState } from 'react';
import { Button, Col, message, Row } from 'antd';
import GeneralContent from './general_content';
import { backendModeConfig } from '../../api/util/default';
import { setDynamicNat, delDynamicNat } from '../../api/dynamic_nat_api';
import { getRouterId } from '../../sessionConfig';

export default function DynamicNAT() {
    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(false);

    const [spinTip, setSpinTip] = useState(null);

    const checkRouter = () => {
        if (getRouterId() !== 2) {
            message.error('动态NAT请在R2上配置！');
            return false;
        }
        return true;
    };

    const conf = () => {
        if (!checkRouter()) return;
        console.log('配置动态NAT');
        if (backendModeConfig) {
            setLoading(true);
            setSpinTip('动态NAT配置中。。。');
            setDynamicNat(data => {
                setResult(data);
                setLoading(false);
            });
        } else {
            setResult('conf t\n' +
                'ip nat pool nju 200.1.1.253 200.1.1.254 p 24\n' +
                'ip nat inside source list 1 pool nju\n' +
                'end');
        }
    };

    const delConf = () => {
        if (!checkRouter()) return;
        console.log('删除动态NAT配置');
        if (backendModeConfig) {
            setLoading(true);
            setSpinTip('动态NAT配置删除中。。。');
            delDynamicNat(result => {
                setResult(result);
                setLoading(false);
            });
        } else {
            setResult('conf t\n' +
                'no ip nat inside source list 1 pool nju\n' +
                'no ip nat pool nju 200.1.1.253 200.1.1.254 p 24\n' +
                'end');
        }
    };

    return (
        <GeneralContent result={result} loading={loading} spinTip={spinTip}>
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
