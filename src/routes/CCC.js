import React, { Component } from 'react';
import { Link } from 'dva/router';
import { Button, Card } from 'antd';

class CCC extends Component {
    render() {
        return (
            <Card title="CCC页">
                <Link to="/aaa">
                    <Button type="primary" icon="enter">
                        去AAA页面
                    </Button>
                </Link>
                <br />
                <Link to="/aaa/bbb">
                    <Button type="primary" icon="enter">
                        去BBB页面
                    </Button>
                </Link>
            </Card>
        );
    }
}

export default CCC;
