import { genderFilter, interestFilter, statusFilter } from "../../utils/filter";

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        width: 80,
        fixed: 'left'
    },
    {
        title: '用户名',
        dataIndex: 'userName',
        width: 80,
        fixed: 'left'
    },
    {
        title: '年龄',
        dataIndex: 'age',
        width: 80,
        sorter: (a, b) => {
            return a.age - b.age;
        }
    },
    {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
            return genderFilter(sex)
        },
        width: 80
    },
    {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
            return genderFilter(sex)
        },
        width: 80
    },
    {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
            return genderFilter(sex)
        },
        width: 80
    },
    {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
            return genderFilter(sex)
        },
        width: 80
    },
    {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
            return genderFilter(sex)
        },
        width: 80
    },
    {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
            return genderFilter(sex)
        },
        width: 80
    },
    {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
            return genderFilter(sex)
        },
        width: 80
    },
    {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
            return genderFilter(sex)
        },
        width: 80
    },
    {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
            return genderFilter(sex)
        },
        width: 80
    },
    {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
            return genderFilter(sex)
        },
        width: 80
    },
    {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
            return genderFilter(sex)
        },
        width: 80
    },
    {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
            return genderFilter(sex)
        },
        width: 80
    },
    {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
            return genderFilter(sex)
        },
        width: 80
    },
    {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
            return genderFilter(sex)
        },
        width: 80
    },
    {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
            return genderFilter(sex)
        },
        width: 80
    },
    {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
            return genderFilter(sex)
        },
        width: 80
    },

    {
        title: '状态',
        dataIndex: 'state',
        render(state) {
            return statusFilter(state)
        },
        width: 120
    },
    {
        title: '爱好',
        dataIndex: 'interest',
        render(interest) {
            return interestFilter(interest)
        },
        width: 80
    },
    {
        title: '生日',
        dataIndex: 'birthday',
        width: 140
    },
    {
        title: '地址',
        dataIndex: 'address',
        width: 140
    },
    {
        title: '早起时间',
        dataIndex: 'time',
        width: 120,
    },
    {
        title:'操作',
        dataIndex:'caozuo',
        width:120
    }
];
export default columns;