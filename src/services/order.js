import axios from '../utils/request'

export function getList(params, loading = false) {
    return axios.ajax({
        url: '/order/list',
        data: {
            params,
            isShowLoading: loading
        }
    }).then(res => res)
}

export function getDetailInfo(params, loading = false) {
    return axios.ajax({
        url: '/order/detail',
        data: {
            params,
            isShowLoading: loading
        }
    }).then(res => res)
}

export function getDetail(params, loading = false) {
    return axios.ajax({
        url: '/order/ebike_info',
        data: {
            params
        }
    }).then((res) => res)
}


export function getFinish(params, loading = false) {
    return axios.ajax({
        url: '/order/finish_order',
        data: {
            params
        }
    }).then((res) => res)
}
