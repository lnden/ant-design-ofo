import Utils from '../../utils/utils';

const columns = [
    {
        title: '角色ID',
        dataIndex: 'id',
        width: 100,
    },
    {
        title: '角色名称',
        dataIndex: 'role_name',
    },
    {
        title: '创建时间',
        dataIndex: 'create_time',
    },
    {
        title: '使用状态',
        dataIndex: 'status',
    },
    {
        title: '授权时间',
        dataIndex: 'authorize_time',
        render: Utils.formateDate,
    },
    {
        title: '授权人',
        dataIndex: 'authorize_user_name',
    },
];

export default columns;
