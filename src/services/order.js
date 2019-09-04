import axios from '../utils/request'

export function tableDate(params,loading=false) {
    return axios.ajax({
        url: '/order/list',
        data: {
            params,
            isShowLoading: loading
        }
    }).then(res => res)
}


export function requestDetailInfo(params,loading=false) {
    return axios.ajax({
        url: '/order/detail',
        data: {
            params,
            isShowLoading: loading
        }
    }).then(res => res)
}
