const formList = [
    {
        type: 'SELECT',
        label: '城市',
        field: 'city',
        placeholder: '全部',
        initialValue: '',
        list: [{ id: '', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }],
        width: 100,
    },
    {
        type: 'DATE',
        label: '时间查询',
        field: 'time',
        placeholder: '请选择时间',
    },
    {
        type: 'SELECT',
        label: '订单状态',
        field: 'order_status',
        placeholder: '全部',
        initialValue: '',
        list: [
            { id: '', name: '全部' },
            { id: '1', name: '进行中' },
            { id: '2', name: '行程结束' },
        ],
        width: 100,
    },
];

export default formList;
