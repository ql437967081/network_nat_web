import React, { useState } from 'react';
import { Button, Col, message, Row } from 'antd';
import GeneralContent from './general_content';
import { backendModeConfig } from '../../api/util/default';
import { setStaticNat, delStaticNat } from '../../api/static_nat_api';
import { getRouterId } from '../../sessionConfig';

export default function StaticNAT() {
    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(false);

    const [spinTip, setSpinTip] = useState(null);

    const checkRouter = () => {
        if (getRouterId() !== 2) {
            message.error('静态NAT请在R2上配置！');
            return false;
        }
        return true;
    };

    const conf = () => {
        if (!checkRouter()) return;
        console.log('配置静态NAT');
        if (backendModeConfig) {
            setLoading(true);
            setSpinTip('静态NAT配置中。。。');
            setStaticNat(data => {
                setResult(data);
                setLoading(false);
            });
        } else {
            setResult('conf t\n' +
                'ip nat inside source static 192.168.1.1 200.1.1.254\n' +
                'end');
        }
    };

    const delConf = () => {
        if (!checkRouter()) return;
        console.log('删除静态NAT配置');
        if (backendModeConfig) {
            setLoading(true);
            setSpinTip('静态NAT配置删除中。。。');
            delStaticNat(data => {
                setResult(data);
                setLoading(false);
            });
        } else {
            setResult('conf t\n' +
                'no ip nat inside source static 192.168.1.1 200.1.1.254\n' +
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
