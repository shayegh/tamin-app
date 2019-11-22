import React, {useState} from 'react';
import {Form, Icon, message, Popconfirm, Table} from "antd";
import './Supervision.css';
import SupHeaderForm from "./SupHeader";
import SupDetailForm from "./SupDetail";

const FormItem = Form.Item;

const dataSource = [
    {
        id: '1',
        srdSubject: 'Mike',
        srdSubjectCount: 5,
        srdSubjectErrorCount: 32,
        srdComment: '10 Downing Street',
    },
];

const NewSup = (props) => {

    console.log('New Sup props : ',props.match.params.headerId);

    const initialDetailFormState = {id: null, srdSubject: '', srdSubjectCount: 0, srdSubjectErrorCount: 0, srdComment: ''};
    const initialHeaderFormState = {id: null, surveyDate: '', surveyCreateDate: '', srdSubjectErrorCount: 0, srdComment: ''};
    // Setting state
    const [details, setDetails] = useState(dataSource);
    const [currentDetail, setCurrentDetail] = useState(initialDetailFormState);
    const [currentHeader, setCurrentHeader] = useState(initialHeaderFormState);
    const [showDetail, setShowDetail] = useState(false);
    const [headerID, setHeaderID] = useState(null);
    // CRUD operations
    const addDetail = detail => {
        detail.id = details.length + 1;
        setDetails([...details, detail]);
        setCurrentDetail(initialDetailFormState);
        // toast.success('اطلاعات با موفقیت اضافه شد');
        message.success('اطلاعات با موفقیت اضافه شد');

    };

    const deleteDetail = fr => {
        // setEditing(false)

        setDetails(details.filter(detail => detail.id !== fr.id));
        message.success('اطلاعات با موفقیت حذف شد')
    };

    const addHeader = (hid) => {
        setShowDetail(true);
        console.log('Header ID:',hid);
        setHeaderID(hid);

    };

    const columns = [
        {
            title: 'موضوع',
            dataIndex: 'srdSubject',
            key: 'srdSubject',
        },
        {
            title: 'تعداد موارد بررسی',
            dataIndex: 'srdSubjectCount',
            key: 'srdSubjectCount',
        },
        {
            title: 'تعداد خطا',
            dataIndex: 'srdSubjectErrorCount',
            key: 'srdSubjectErrorCount',
            // defaultSortOrder: 'descend',
            // sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'توضیحات',
            dataIndex: 'srdComment',
            key: 'srdComment',
        }
        ,
        {
            title: 'عملیات',
            dataIndex: 'id',
            key: 'id',
            render: (text, record) => {
                return (
                    <div>
                        <Icon type="edit" theme="twoTone" style={{marginLeft: 5}}
                              onClick={() => {
                                  // console.log(record);
                                  setCurrentDetail(record);
                              }}/>
                        <Popconfirm
                            title="آیا از حذف مطمئن هستید؟"
                            onConfirm={() => {
                                deleteDetail(record);
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
    const cancel = (e) => {
        console.log(e);
        // message.error('Click on No');
    };


    return (
        <div className="App">
            <SupHeaderForm currentHeader={currentHeader} addHeader={addHeader}/>
            {showDetail? <div>
                <SupDetailForm currentDetail={currentDetail} addDetail={addDetail}/>
                <Table dataSource={details} columns={columns} size="small"/>
            </div>: null}
        </div>
    )

};

export default NewSup;