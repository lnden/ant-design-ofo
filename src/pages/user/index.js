import React, { Component } from 'react'
import { Card, Button,Modal,Form,Input,Radio,DatePicker,Select } from 'antd'
import axios from '../../utils/request'
import Utils from '../../utils/utils'
import BaseForm from '../../components/BaseForm'
import BaseTable from '../../components/BaseTable'
import formList from './map'
import columns from './columns'
import moment from 'moment'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const Option = Select.Option;

export default class User extends Component {

    state = {
        dataSource: [],
        pagination: null,
        selectedRowKeys:'',
        selectedItem:[]
    }

    params = {
        page: 1
    }

    handleFilter = (params) => {
        // this.params = params;
        // this.requestList()
    };

    componentDidMount(){
        // this.requestList()
    }

    requestList = () => {
        axios.requestList(this,'order/list',this.params,true)
    };

    // 功能区操作
    handleOperate = (type) => {
        let item = this.state.selectedItem;
        switch(type){
            case 'create':
                this.setState({
                    type,
                    isVisible:true,
                    title:'创建员工'
                });break;
            case 'edit':
                if(!item){
                    Modal.info({
                        title:'提示',
                        content:'请选择一个用户'
                    });
                    return
                }
                this.setState({
                    type,
                    isVisible:true,
                    title:'编辑员工',
                    userInfo:item
                });break;
            case 'detail':
                this.setState({
                    type,
                    isVisible:true,
                    title:'员工详情',
                    userInfo:item
                });break;
            default:
                if(!item){
                    Modal.info({
                        title:'提示',
                        content:'请选择一个用户'
                    });
                    return
                }

                Modal.confirm({
                    title:'确认删除',
                    content:'是否要删除当前选中的员工',
                    onOk:()=>this.handleOkDelete()
                })
        }
    };

    handleOkDelete = () => {
        let item = this.state.selectedItem;
        axios.ajax({
            url:'user/delete',
            data:{
                params:{
                    id:item.id
                }
            }
        }).then(res=>{
            if(res.code===0){
                this.seState({
                    isVisible:false,
                })
                this.requestList()
            }
        })
    };

    // 创建员工提交
    handleSubmit = () => {
        let type = this.state.type;
        let data = this.userForm.props.form.getFieldsValue();
        axios.ajax({
            url: type==='create'?'user/create':'user/edit ',
            data:{
                params:data
            }
        }).then(res=>{
            if(res===0){
                this.userForm.props.form.resetFields()
                this.setState({
                    isVisible: false
                })
                this.requestList()
            }
        })
    }

    render() {
        const { dataSource,title,isVisible } = this.state;
        let footer = {};
        if(this.state.type==='detail'){
            footer = {
                footer:null
            }
        }
        return (
            <Card title="员工管理">
                <BaseForm layout="inline" formList={formList} filterSubmit={this.handleFilter} />
                <Card>
                    <Button type="primary" icon="plus" onClick={()=>this.handleOperate('create')}>创建员工</Button>
                    <Button type="primary" icon="edit" onClick={()=>this.handleOperate('edit')}>编辑员工</Button>
                    <Button type="primary" onClick={()=>this.handleOperate('detail')}>员工详情</Button>
                    <Button type="primary" icon="delete" onClick={()=>this.handleOperate('delete')}>删除员工</Button>
                </Card>
                <BaseTable
                    updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                />
                <Modal
                    title={title}
                    visible={isVisible}
                    onOk={this.handleSubmit}
                    onCancel={()=>{
                        this.userForm.props.form.resetFields()
                        this.setState({isVisible:false})
                    }}
                    width={600}
                    {...footer}
                >
                    <UserForm type={this.state.type} userInfo={this.state.userInfo} wrappedComponentRef={(inst)=>this.userForm = inst}/>
                </Modal>
            </Card>
        )
    }
}

class UserForm extends Component {
    getState = (state) => {
        return {
            "1":"咸鱼一条",
            "2":"风华浪子",
            "3":"北大才子"
        }[state]
    }
    render(){
        let type = this.props.type;
        let userInfo = this.props.userInfo || {};
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol:{span:5},
            wrapperCol:{span:19}
        };
        return (
            <Form layout="horizontal">
                <FormItem label="用户名" {...formItemLayout}>
                    {
                        type === 'detail'?userInfo.username:
                        getFieldDecorator('user_name',{
                            initialValue:userInfo.username
                        })(
                            <Input type="text" placeholder="请输入用户名"/>
                        )
                    }
                </FormItem>

                <FormItem label="性别" {...formItemLayout}>
                    {
                        type === 'detail'?userInfo.sex === 1 ? '男':'女':
                        getFieldDecorator('sex',{
                            initialValue:userInfo.sex
                        })(
                            <RadioGroup>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>

                <FormItem label="状态" {...formItemLayout}>
                    {
                        type === 'detail'?this.getState(userInfo.state):
                        getFieldDecorator('state',{
                            initialValue:userInfo.state
                        })(
                            <Select>
                                <Option value={1}>咸鱼一条</Option>
                                <Option value={2}>风华浪子</Option>
                                <Option value={3}>北大才子</Option>
                            </Select>
                        )
                    }
                </FormItem>

                <FormItem label="生日" {...formItemLayout}>
                    {
                        type === 'detail'?userInfo.birthday:
                        getFieldDecorator('birthday',{
                            initialValue:moment(userInfo.birthday)
                        })(
                            <DatePicker />
                        )
                    }
                </FormItem>

                <FormItem label="联系地址" {...formItemLayout}>
                    {
                        type === 'detail'?userInfo.address:
                        getFieldDecorator('address',{
                            initialValue:userInfo.address
                        })(
                            <TextArea rows={2} placeholder="请输入联系地址"/>
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}

UserForm = Form.create({})(UserForm)