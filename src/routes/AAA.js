import React, { Component } from 'react';
import { Link } from 'dva/router';
import { Button, Card } from 'antd';

class AAA extends Component {
    render() {
        return (
            <Card title="AAA页面">
                <Link to="/aaa/bbb">
                    <Button type="primary" icon="link">
                        去BBB页面
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

export default AAA;
