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
