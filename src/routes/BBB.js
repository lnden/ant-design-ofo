import React, { Component } from 'react';
import { Link } from 'dva/router';
import { Button, Card } from 'antd';

class BBB extends Component {
    render() {
        return (
            <Card title="BBB页">
                <Link to="/aaa">
                    <Button type="primary" icon="link">
                        去AAA页面
                    </Button>
                </Link>
                <br />
                <Link to="/ccc">
                    <Button type="primary" icon="link">
                        去CCC页面
                    </Button>
                </Link>
            </Card>
        );
    }
}

export default BBB;
