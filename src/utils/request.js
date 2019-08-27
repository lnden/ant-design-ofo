import axios from 'axios'
import { Modal } from 'antd';

export default class Axios {
    static ajax(options) {
        const baseApi = "https://www.easy-mock.com/mock/5d5ec2393da1210743354970/v1"
        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                method: 'get',
                baseURL: baseApi,
                timeout: 5000,
                params: (options.data && options.data.params) || ''
            }).then(response => {
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