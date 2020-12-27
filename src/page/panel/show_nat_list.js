import React, { useState } from 'react';
import { Button, Col, Row } from 'antd';
import GeneralContent from './general_content';
import { backendModeConfig } from '../../api/util/default';
import { getTranslations, delTranslations } from '../../api/nat_translations_api';

export default function ShowNAtList(){
    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(false);

    const [spinTip, setSpinTip] = useState(null);

    const conf = () => {
        console.log('查看NAT列表');
        if (backendModeConfig) {
            setLoading(true);
            setSpinTip('NAT列表获取中。。。');
            getTranslations(data => {
                setResult(data);
                setLoading(false);
            });
        } else {
            setResult('show ip nat translations\n');
        }
    };

    const delConf = () => {
        console.log('清除NAT列表');
        if (backendModeConfig) {
            setLoading(true);
            setSpinTip('NAT列表清除中。。。');
            delTranslations(data => {
                setResult(data);
                setLoading(false);
            });
        } else {
            setResult('clear ip nat translation *\n');
        }
    };

    return (
        <GeneralContent result={result} loading={loading} spinTip={spinTip}>
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
