import React from 'react';
import { Button } from 'antd';
import GeneralContent from './general_content';

export default function StaticNAT() {
    return (
        <GeneralContent>
            <Button>配置</Button>
            <Button>删除配置</Button>
        </GeneralContent>
    );
}
