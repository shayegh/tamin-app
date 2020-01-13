import React, {useEffect, useState} from 'react';
import {getUsersList} from "../util/APIUtils";
import {showError} from "../util/Helpers";

const UserList = (props) => {
    const [data, setData] = useState({users: []});
    useEffect(() => {
        // const fetchData = async () =>{
        //     const result = await getUsersList();
        //     console.log('Result :',result.content);
        //     setData({users:result.content});
        //     console.log('Data: ',data);
        // };

        getUsersList()
            .then(response => {
                console.log('Result :', response);
                setData({users: response.content});
            })
            .catch(error => {
                showError(error);
            });

    }, []);

    return (
        <ul>
            {data.users.map(item => (
                <li key={item.id}>
                    <a href={item.name}>{item.username}</a>
                </li>
            ))}
        </ul>
    );
};

export default UserList;

