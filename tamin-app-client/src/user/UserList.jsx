import React, {useEffect, useState} from 'react';
import {getUsersList} from "../util/api";
import {compareByAlph, showError} from "../util/Helpers";
import {Link} from "react-router-dom";
import {Button, Icon, Popconfirm, Table, Tooltip} from "antd";
import ExportExcel from "../common/components/ExportExcel";

const columns = [
    {
        title: '#',
        key: 'index',
        render: (text, record, index) => index + 1,
    },
    {
        title: ' نام ',
        dataIndex: 'name',
        key: 'name',
        align: 'right',

    },
    {
        title: 'نام کاربری',
        dataIndex: 'username',
        key: 'username',
        align: 'right',
    },
    {
        title: 'ایمیل',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: ' شعبه',
        dataIndex: 'brchName',
        key: 'brchName',
        sorter: (a, b) => compareByAlph(a.brchName, b.brchName),
        // ...this.getColumnSearchProps('brchName'),
        align: 'right',
    },
    {
        title: ' واحد',
        dataIndex: 'unitName',
        key: 'unitName',
        // sorter: (a, b) => compareByAlph(a.unitName, b.unitName),
        align: 'right',
    },
    {
        title: 'عملیات',
        dataIndex: 'username',
        key: 'id',
        render: (text, record) => {
            return (
                <div>
                    <Link to={`/signup/${text}`}>
                        <Tooltip title="ویرایش">
                            <Icon type="edit" theme="twoTone" style={{marginLeft: 5}}/>
                        </Tooltip>
                    </Link>
                    {
                        record.status === 'NEW' ?
                            <Popconfirm
                                title="آیا از حذف مطمئن هستید؟"
                                onConfirm={() => {
                                    this.deleteHeader(record);
                                }}
                                okText="بله"
                                cancelText="خیر"
                            >
                                <Icon type="delete" theme="twoTone" twoToneColor='#eb2f96' style={{marginLeft: 5}}/>
                            </Popconfirm>
                            :
                            null
                    }
                </div>
            )
        }
    }
];

const UserList = () => {
    const [data, setData] = useState({users: []});
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        // const fetchData = async () =>{
        //     const result = await getUsersList();
        //     console.log('Result :',result.content);
        //     setData({users:result.content});
        //     console.log('Data: ',data);
        // };
        setIsLoading(true);
        getUsersList()
            .then(response => {
                console.log('Result :', response);
                setData({users: response.content});
            })
            .catch(error => {
                showError(error);
            });
        setIsLoading(false);

    }, []);

    return (
        <div className="App">
            <ExportExcel cols={columns} data={data.users} fileName='SRList'
                         style={{float: "left", cursor: "pointer", fontSize: '18px'}}/>
            <Table dataSource={data.users}
                   rowKey={record => record.username} columns={columns}
                   bodyStyle={{width: '100%'}} size="small" loading={isLoading}
                   pagination={{
                       showSizeChanger: true,
                       hideOnSinglePage: true,
                   }}
            />
            <Button htmlType="submit" type="primary" style={{float: "left"}}>
                <Link to='/signup'>
                    جدید
                </Link>
            </Button>
        </div>
    );
};

export default UserList;

