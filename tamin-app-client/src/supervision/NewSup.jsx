import React, {useEffect, useState} from 'react';
import {Icon, Popconfirm, Table} from "antd";
import './Supervision.scss';
import SupDetailForm from "./SupDetail";
import {getHeader} from '../util/APIUtils';
import {toast} from 'react-toastify';
import SupHeader2 from "./SupHeader2";

const dataSource = [];

const NewSup = (props) => {

    const initialDetailFormState = {
        id: null,
        srdSubject: '',
        srdSubjectCount: 0,
        srdSubjectErrorCount: 0,
        srdComment: ''
    };
    const initialHeaderFormState = {
        id: null,
        surveyDate: '',
        surveyCreateDate: '',
        srdSubjectErrorCount: 0,
        srdComment: ''
    };
    useEffect(() => {
        let headerId = props.match.params.headerId;
        if (headerId !== undefined) {
            // console.log('Header ID : ', headerId);
            getHeader(headerId)
                .then(response => {
                    console.log('Effect Response :', response);
                    setCurrentHeader(response);
                    // setReInitials(true);
                })
        } else {
            console.log('No Header ID');
        }

    }, []);


    // Setting state
    const [details, setDetails] = useState(dataSource);
    const [currentDetail, setCurrentDetail] = useState(initialDetailFormState);
    const [currentHeader, setCurrentHeader] = useState(initialHeaderFormState);
    const [showDetail, setShowDetail] = useState(false);
    const [reInitials, setReInitials] = useState(false);
    const [headerID, setHeaderID] = useState(null);



    // CRUD operations
    const addDetail = detail => {
        detail.id = details.length + 1;
        setDetails([...details, detail]);
        setCurrentDetail(initialDetailFormState);
        toast.success('اطلاعات با موفقیت اضافه شد');
        // message.success('اطلاعات با موفقیت اضافه شد');

    };

    const deleteDetail = fr => {
        // setEditing(false)

        setDetails(details.filter(detail => detail.id !== fr.id));
        toast.success('اطلاعات با موفقیت حذف شد')
    };

    const addHeader = (hid) => {
        setReInitials(false);
        setShowDetail(true);
        console.log('Header ID:', hid);
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
        },
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

    console.log('current header',currentHeader);
    return (
        <div className="App">
            <SupHeader2 currentHeader={currentHeader} reInitials={reInitials} addHeader={addHeader}/>
            {showDetail ?
                <div>
                    <SupDetailForm currentDetail={currentDetail} addDetail={addDetail}/>
                    <Table dataSource={details} rowKey='id' columns={columns} size="small"/>
                </div>
                :
                null}
        </div>
    )

};

export default NewSup;