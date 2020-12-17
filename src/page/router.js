import React from 'react';
import { withRouter } from 'react-router-dom';

class Router extends React.Component{
    constructor(props) {
        super(props);
        const { router_id } = props.match.params;
        this.state = { router_id };
    }

    componentDidMount() {
        console.log('获取路由器信息。。。');
        const { router_id } = this.state;
        console.log(`router_id: ${router_id}`);
    }

    render() {
        const { router_id } = this.state;
        return (
            <div>
                <h2>路由器信息</h2>
                <h4>主机名：R{router_id}</h4>
                <h4>IP地址：……</h4>
            </div>
        );
    }
}

export default withRouter(Router);
