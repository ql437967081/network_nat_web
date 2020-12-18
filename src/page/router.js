import React from 'react';
import { Button, Card } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';

class Router extends React.Component{
    constructor(props) {
        super(props);
        const { router_id } = props.match.params;
        this.state = { router_id };
    }

    logout = () => {
        this.props.history.push('/home');
    };

    componentDidMount() {
        const { router_id } = this.state;
        console.log(`连接R${router_id}。。。`);
        console.log('获取路由器信息。。。');
        console.log(`router_id: ${router_id}`);
    }

    componentWillUnmount() {
        const { router_id } = this.state;
        console.log(`断开连接R${router_id}。。。`);
    }

    render() {
        const { router_id } = this.state;
        return (
            <Card
                title={'路由器信息'}
                extra={
                    <Button
                        danger
                        icon={<LogoutOutlined />}
                        onClick={this.logout}
                    >
                        断开连接
                    </Button>
                }
            >
                <h4>主机名：R{router_id}</h4>
                <h4>IP地址：……</h4>
            </Card>
        );
    }
}

export default withRouter(Router);
