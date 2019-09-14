import axios from '../utils/request'

export function getList(params,loading=false) {
    return axios.ajax({
        url: '/city/list',
        data: {
            params,
            isShowLoading: loading
        },
        isMock: true
    }).then(res => res)
}

export function getOpenSave(params,loading=false) {
    return axios.ajax({
        url: '/city/open',
        data: {
            params,
            isShowLoading: loading
        },
        isMock: true
    }).then(res => res)
}