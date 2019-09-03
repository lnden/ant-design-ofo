import axios from '../utils/request'

export function tableDate(params,loading=false) {
    return axios.ajax({
        url: '/open_city',
        data: {
            params,
            isShowLoading: loading
        }
    }).then(res => res)
}

export function openSave(params,loading=false) {
    return axios.ajax({
        url: '/city/open',
        data: {
            params,
            isShowLoading: loading
        }
    }).then(res => res)
}