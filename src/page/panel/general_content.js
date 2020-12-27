import React from 'react';
import { Space, Spin, Typography } from 'antd';

const { Paragraph } = Typography;

export default function GeneralContent({ result, loading, spinTip, children }) {
    return (
        <Space direction={'vertical'} style={{ width: '100%' }}>
            {children}
            <Paragraph>
                <pre style={{ minHeight: 60 }}>
                    <Spin tip={spinTip || '命令执行中。。。'} spinning={loading}>
                        {result || '//输出结果\n//。。。'}
                    </Spin>
                </pre>
            </Paragraph>
        </Space>
    );
}
