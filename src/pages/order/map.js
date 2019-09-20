const formList = [
    {
        type: 'INPUT',
        label: '模式',
        field: 'mode',
        placeholder: '请输入模式',
        // initialValue: "1",
        width: 100,
    },
    {
        type: 'SELECT',
        label: '城市',
        field: 'city',
        placeholder: '全部',
        initialValue: '1',
        width: 100,
        list: [
            { id: '0', name: '全部' },
            { id: '1', name: '北京' },
            { id: '2', name: '天津' },
            { id: '3', name: '深圳' },
        ],
    },
    {
        type: 'DATEPICKER',
    },
    {
        type: 'SELECT',
        label: '订单状态',
        field: 'status',
        placeholder: '全部',
        initialValue: '',
        width: 100,
        list: [
            { id: '0', name: '全部' },
            { id: '1', name: '进行中' },
            { id: '2', name: '结束行程' },
        ],
    },
];
export default formList;
