import React from 'react';
import { Space, Typography } from 'antd';

const { Paragraph } = Typography;

export default function GeneralContent(props) {
    const { result } = props;
    return (
        <Space direction={'vertical'} style={{ width: '100%' }}>
            {props.children}
            <Paragraph>
                <pre>
                    {result || '//输出结果。。。'}
                </pre>
            </Paragraph>
        </Space>
    );
}
