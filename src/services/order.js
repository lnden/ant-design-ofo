import axios from '../utils/request'

export function requestDateList(params, loading = false) {
    return axios.ajax({
        url: '/order/list',
        data: {
            params,
            isShowLoading: loading
        }
    }).then(res => res)
}

export function requestDetailInfo(params, loading = false) {
    return axios.ajax({
        url: '/order/detail',
        data: {
            params,
            isShowLoading: loading
        }
    }).then(res => res)
}

export function requestDetail(params, loading = false) {
    return axios.ajax({
        url: '/order/ebike_info',
        data: {
            params
        }
    }).then((res) => res)
}


export function requestFinish(params, loading = false) {
    return axios.ajax({
        url: '/order/finish_order',
        data: {
            params
        }
    }).then((res) => res)
}
