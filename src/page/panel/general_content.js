import React from 'react';
import { Space, Typography } from 'antd';

const { Paragraph } = Typography;

export default function GeneralContent(props) {
    return (
        <Space direction={'vertical'}>
            {props.children}
            <Paragraph>
                <blockquote>
                    //输出结果。。。
                </blockquote>
            </Paragraph>
        </Space>
    );
}
