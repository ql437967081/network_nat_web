import React, { useState } from 'react';
import { Alert, Button, Col, message, Row } from 'antd';
import GeneralContent from './general_content';
import { backendModeConfig } from '../../api/util/default';
import { getTranslations, delTranslations } from '../../api/nat_translations_api';

export default function ShowNAtList(){
    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(false);

    const [spinTip, setSpinTip] = useState(null);

    const [successMessage, setSuccessMessage] = useState(false);

    const [errorMessage, setErrorMessage] = useState(false);

    const conf = () => {
        console.log('查看NAT列表');
        if (backendModeConfig) {
            setLoading(true);
            setSuccessMessage(false);
            setErrorMessage(false);
            setSpinTip('NAT列表获取中。。。');
            getTranslations(data => {
                const { result, status } = data;
                setResult(result);
                if (status) {
                    message.success('校验成功');
                    setSuccessMessage(true);
                } else {
                    message.error('校验失败');
                    setErrorMessage(true);
                }
                setLoading(false);
            });
        } else {
            setSuccessMessage(true);
            setErrorMessage(false);
            setResult('show ip nat translations\n');
        }
    };

    const delConf = () => {
        console.log('清除NAT列表');
        if (backendModeConfig) {
            setLoading(true);
            setSuccessMessage(false);
            setErrorMessage(false);
            setSpinTip('NAT列表清除中。。。');
            delTranslations(data => {
                setResult(data);
                setLoading(false);
            });
        } else {
            setSuccessMessage(false);
            setErrorMessage(false);
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
            <Row>
                <Col>
                    {successMessage && (
                        <Alert message={'校验成功'} type={'success'} />
                    )}
                    {errorMessage && (
                        <Alert message={'校验失败'} type={'error'} />
                    )}
                </Col>
            </Row>
        </GeneralContent>
    );
}
