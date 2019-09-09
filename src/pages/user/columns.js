import {genderFilter, interestFilter, statusFilter} from "../../utils/filter";

const columns = [
    {
        title: 'Id',
        dataIndex: 'id'
    },
    {
        title: '用户名',
        dataIndex: 'username'
    },
    {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
            return genderFilter(sex)
        }
    },
    {
        title: '状态',
        dataIndex: 'state',
        render(state) {
            return statusFilter(state)
        }
    },
    {
        title: '爱好',
        dataIndex: 'interest',
        render(interest) {
            return interestFilter(interest)
        }
    },
    {
        title: '生日',
        dataIndex: 'birthday'
    },
    {
        title: '地址',
        dataIndex: 'address'
    },
    {
        title: '早起时间',
        dataIndex: 'time'
    },
];
export default columns;