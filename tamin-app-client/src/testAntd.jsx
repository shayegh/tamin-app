import React, {useState} from 'react';
import {Icon, message, Popconfirm, Table} from "antd";
import MyFormikForm from './MyForm';

const dataSource = [
    {
        key: '1',
        username: 'Mike',
        email: 'ali@ali.com',
        age: 32,
        address: '10 Downing Street',
    },
    {
        key: '2',
        username: 'John',
        email: 'john@john.com',
        age: 42,
        address: '10 Downing Street',
    },
];


function TestAntd(props) {

    const initialFormState = {key: null, email: '', username: '', age: '', address: '', date: ''};
    // Setting state
    const [fruits, setFruits] = useState(dataSource);
    const [currentFruit, setCurrentFruit] = useState(initialFormState);
    // CRUD operations
    const addFruit = fruit => {
        fruit.key = fruits.length + 1;
        setFruits([...fruits, fruit]);
        setCurrentFruit(initialFormState);
        // toast.success('اطلاعات با موفقیت اضافه شد');
        message.success('اطلاعات با موفقیت اضافه شد');

    };

    const deleteUser = fr => {
        // setEditing(false)

        setFruits(fruits.filter(fruit => fruit.key !== fr.key));
        message.success('Deleted Successfully')
    };

    const cancel = (e) => {
        console.log(e);
        // message.error('Click on No');
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'username',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        }
        ,
        {
            title: 'bookingClient',
            dataIndex: 'bookingClient',
            key: 'bookingClient',
        }
        ,
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Actions',
            dataIndex: 'key',
            key: 'key',
            render: (text, record) => {
                return (
                    <div>
                        <Icon type="edit" theme="twoTone" style={{marginLeft: 5}}
                              onClick={() => {
                                  // console.log(record);
                                  setCurrentFruit(record);
                              }}/>
                        <Popconfirm
                            title="آیا از حذف مطمئن هستید؟"
                            onConfirm={() => {
                                deleteUser(record);
                            }}
                            onCancel={cancel}
                            okText="بله"
                            cancelText="خیر"
                        >
                            <Icon type="delete" theme="twoTone" twoToneColor='#eb2f96'/>
                        </Popconfirm>
                    </div>
                )
            }
        }
    ];


    return (
        <div className="App">
            <h3>Chose a fruit</h3>
            <MyFormikForm currentFruit={currentFruit} addFruit={addFruit}/>
            <Table dataSource={fruits} columns={columns} size="small"/>
        </div>
    );
}


export default TestAntd;