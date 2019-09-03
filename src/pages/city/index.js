import React, {Component} from 'react'
import {Card, Button, Table, Modal, message, Divider} from 'antd'
import Utils from '../../utils/utils'
import FilterForm from './FilterForm'
import OpenCityForm from './OpenCityForm'
import Tables from './Tables'
import {tableDate, openSave} from '../../services/city'

export default class City extends Component {

    state = {
        dataSource: [],
        isShowOpenCity: false
    };

    params = {
        page: 1
    };

    componentDidMount() {
        this.requestList()
    }

    requestList() {
        tableDate(this.params, true).then(res => {
            if (res.code === 0) {
                res.result.list.map((item, index) => item.key = index);
                this.setState({
                    dataSource: res.result.list,
                    pagination: Utils.pagination(res, (current) => {
                        this.params.page = current;
                    })
                })
            }
        })
    }

    //开通城市
    handleOpenCity = () => {
        this.setState({isShowOpenCity: true})
    };

    //城市开通提交
    handleSubmit = () => {
        let cityInfo = this.cityForm.props.form.getFieldsValue();
        openSave(cityInfo).then(res => {
            if (res.code === 0) {
                message.success('城市开通成功');
                this.setState({isShowOpenCity: false});
                this.requestList()
            }
        })
    };

    render() {
        const {dataSource, pagination, isShowOpenCity} = this.state;
        return (
            <div>
                <Card>
                    <FilterForm/>
                    <Divider type="horizontal"/>
                    <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
                    <Divider type="horizontal"/>
                    <Tables dataSource={dataSource} pagination={pagination}/>
                </Card>
                <Modal
                    title="开通城市"
                    visible={isShowOpenCity}
                    onCancel={() => {
                        this.setState({isShowOpenCity: false})
                    }}
                    onOk={this.handleSubmit}
                >
                    <OpenCityForm wrappedComponentRef={(inst) => {
                        this.cityForm = inst
                    }}/>
                </Modal>
            </div>
        )
    }
}


