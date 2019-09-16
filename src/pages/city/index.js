import React, {Component} from 'react'
import {Card, Button, Modal, message, Divider} from 'antd'
import Utils from '../../utils/utils'
import FilterForm from './FilterForm'
import OpenCityForm from './OpenCityForm'
import Tables from './Tables'
import {getList, getOpenSave} from '../../services/city'

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
        getList(this.params, true, false).then(res => {
            res.result.list.map((item, index) => item.key = index);
            this.setState({
                dataSource: res.result.list,
                pagination: Utils.pagination(res, (current) => {
                    this.params.page = current;
                })
            })
        })
    }

    //开通城市
    handleOpenCity = () => {
        this.setState({isShowOpenCity: true})
    };

    //城市开通提交
    handleSubmit = () => {
        let cityInfo = this.cityForm.props.form.getFieldsValue();
        getOpenSave(cityInfo,true,false).then(res => {
            this.setState({isShowOpenCity: false});
            message.success('城市开通成功');
            this.requestList()
        })
    };

    handleSearch = (data) =>{
        // console.log('子组件触发的~',data)
        Object.assign(this.params,data);
        this.requestList()
    }
    render() {
        const {dataSource, pagination, isShowOpenCity} = this.state;
        return (
            <div>
                <Card>
                    <FilterForm handleSearch={this.handleSearch}/>
                    <Divider type="horizontal"/>
                    <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
                    <Divider type="horizontal"/>
                    <Tables dataSource={dataSource} pagination={pagination} handleSearch={this.handleSearch}/>
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


