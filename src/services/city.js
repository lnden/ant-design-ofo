import axios from '../utils/request'

export function getList(params,loading=false,isMock) {
    return axios.ajax({
        url: '/city/list',
        data: {
            params,
            isShowLoading: loading
        },
        isMock
    }).then(res => res)
}

export function getOpenSave(params,loading=false,isMock) {
    return axios.ajax({
        url: '/city/open',
        data: {
            params,
            isShowLoading: loading
        },
        isMock
    }).then(res => res)
}