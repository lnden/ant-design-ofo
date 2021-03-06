import axios from 'axios';
import { Modal } from 'antd';
import JsonP from 'jsonp';
import Utils from './utils';

export default class Axios {
    static requestList(_this, url, params, isMock) {
        this.ajax({
            url,
            data: { params },
            isMock,
        }).then(res => {
            if (res.code === 0) {
                const data = res.result.list;
                _this.setState({
                    dataSource: Utils.formateDataList(data),
                    pagination: Utils.pagination(res, current => {
                        _this.requestList(current);
                    }),
                });
            }
        });
    }

    static jsonp(options) {
        return new Promise((resolve, reject) => {
            JsonP(
                options.url,
                {
                    param: 'callback',
                },
                /* eslint-disable */
                function(err, response) {
                    if (response.status === 'success') {
                        resolve(response);
                    } else {
                        reject(response.message);
                    }
                },
                /* eslint-enable */
            );
        });
    }

    static ajax(options) {
        const loading = document.getElementById('ajaxLoading');
        if (options.data && options.data.isShowLoading !== false) {
            loading.style.display = 'block';
        }

        let baseApi = String;
        if (options.isMock) {
            baseApi = 'https://www.easy-mock.com/mock/5d5ec2393da1210743354970/v1';
            // baseApi = "http://yapi.demo.qunar.com/mock/96410"
        } else {
            baseApi = 'http://localhost:3000/mock-api/pages/';
        }
        return new Promise((resolve, reject) => {
            axios({
                url: options.isMock ? options.url : `${options.url}.json`,
                method: 'get',
                baseURL: baseApi,
                timeout: 5000,
                params: (options.data && options.data.params) || '',
            }).then(response => {
                if (options.data && options.data.isShowLoading !== false) {
                    loading.style.display = 'none';
                }
                if (response.status === 200) {
                    const res = response.data;
                    if (res.code === 0) {
                        resolve(res);
                    } else {
                        Modal.info({
                            title: '提示',
                            content: res.message,
                        });
                    }
                } else {
                    reject(response.data);
                }
            });
        });
    }
}
