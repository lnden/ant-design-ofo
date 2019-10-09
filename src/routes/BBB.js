import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Button, Card, Row, Col, Dropdown, Menu, Pagination, Calendar } from 'antd';
import { injectIntl } from 'react-intl';

const MenuItem = Menu.Item;

class BBB extends Component {
    changeLang = e => {
        const { dispatch } = this.props;
        dispatch({
            type: 'app/changeLang',
            payload: {
                value: e.key,
            },
        });
    };

    render() {
        const {
            i18n,
            intl: { formatMessage },
        } = this.props;
        const menu = (
            <Menu onClick={this.changeLang} selectedKeys={[i18n]}>
                <MenuItem key="zh_CN">中文</MenuItem>
                <MenuItem key="en_US">英文</MenuItem>
                <MenuItem key="zh_HK">繁体</MenuItem>
            </Menu>
        );
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

                <Row>
                    <Col offset={2}>
                        <Dropdown trigger={['click']} overlay={menu}>
                            <Button>
                                {i18n === 'zh_CN' ? '中文' : i18n === 'en_US' ? '英文' : '繁体'}
                            </Button>
                        </Dropdown>
                    </Col>
                    <Col>
                        <p>{formatMessage({ id: 'App.username' })}</p>
                        <p>{formatMessage({ id: 'App.password' })}</p>
                        <p>{formatMessage({ id: 'Aaa.title' })}</p>
                        <div>
                            <Pagination defaultCurrent={1} total={20} showSizeChanger />
                            <Calendar fullscreen={false} />
                        </div>
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default connect(({ app }) => ({
    i18n: app.get('i18n'),
}))(injectIntl(BBB));
