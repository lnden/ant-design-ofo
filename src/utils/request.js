import axios from 'axios'
import { Modal } from 'antd';
// import JsonP from 'jsonp';
import Utils from './utils'

export default class Axios {
    static requestList(_this, url, params, isMock) {
        this.ajax({
            url,
            data: { params },
            isMock
        }).then(res => {
            if (res.code === '0') {
                let list = res.result.list.map((item, index) => {
                    item.key = index
                    return item
                })
                console.log(JSON.stringify(list),11)
                _this.setState({
                    dataSource: list,
                    pagination: Utils.pagination(res, (current) => {
                        _this.params.page = current;
                        _this.requestList()
                    })
                })
            }
        })
    }

    static jsonp(options) {
        return new Promise((resolve, reject) => {
            // JsonP(options.url, {
            //     param: 'callback',

            // }, function (err, response) {
            //     if (response.status == 'success') {
            //         resolve(response)
            //     } else {
            //         reject(response.message)
            //     }
            // })
        })
    }

    static ajax(options) {
        let loading = document.getElementById('ajaxLoading');
        if (options.data && options.data.isShowLoading !== false) {
            loading.style.display = 'block';
        }

        let baseApi = String;
        console.log(options.isMock,'是否使用mock')
        if (options.isMock) {
            baseApi = "https://www.easy-mock.com/mock/5d5ec2393da1210743354970/v1"
        } else {
            // baseApi = "https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api"
            baseApi = "http://localhost:3000/mock-api/pages/"
        }
        return new Promise((resolve, reject) => {
            axios({
                url: options.isMock?options.url:`${options.url}.json`,
                method: 'get',
                baseURL: baseApi,
                timeout: 5000,
                params: (options.data && options.data.params) || ''
            }).then(response => {
                if (options.data && options.data.isShowLoading !== false) {
                    loading.style.display = 'none';
                }
                if (response.status === 200) {
                    let res = response.data;
                    if (res.code === 0) {
                        resolve(res)
                    } else {
                        Modal.info({
                            title: '提示',
                            content: res.message
                        })
                    }
                } else {
                    reject(response.data)
                }
            })
        })
    }
}