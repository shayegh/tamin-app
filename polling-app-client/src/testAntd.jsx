import React, {useState} from 'react';
import {Table} from "antd";

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
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    }
    ,
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
];


function TestAntd(props) {
    // Setting state
    const [fruits, setFruits] = useState(dataSource);
    // CRUD operations
    const addFruit = fruit => {
        fruit.id = fruits.length + 1;
        console.log(fruit);
        setFruits([...fruits, fruit])
    };
    return (
        <div className="App">
            <h3>Chose a fruit</h3>
            <MyFormikForm addFruit={addFruit}/>
            <Table dataSource={fruits} columns={columns}/>
        </div>
    );
}


export default TestAntd;