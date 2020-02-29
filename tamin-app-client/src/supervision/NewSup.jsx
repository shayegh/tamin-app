import React, {useContext, useEffect, useState} from 'react';
import {Divider, Input, Modal, Popconfirm, Table} from 'antd';
import {DeleteTwoTone, FileTextTwoTone} from '@ant-design/icons';
import './Supervision.scss';
import SupDetailForm from './SupDetail';
import {addShobComment, deleteDetail as deleteDetailApi, getAllDetailsByHeaderId} from 'util/api';
import {toast} from 'react-toastify';
import SupHeader2 from './SupHeader2';
import {useParams} from 'react-router-dom';
import {showError} from 'util/Helpers';
import {UserContext} from 'user/UserContext';
import {ConfirmRoles} from '../constants';
import {hasRole} from '../auth/auth';

const {TextArea} = Input;
const dataSource = [];

const NewSup = () => {

    const initialDetailFormState = {
        id: null,
        srdSubject: '',
        srdSubjectCount: 0,
        srdSubjectErrorCount: 0,
        srdComment: ''
    };
    //Current Header ID
    let {hId} = useParams();

    // Setting state
    const [details, setDetails] = useState(dataSource);
    const [currentDetail, setCurrentDetail] = useState(initialDetailFormState);
    const [showDetail, setShowDetail] = useState(false);
    const [visible, setVisible] = useState(false);
    const [shobComment, setShobComment] = useState('');
    const [headerId, setHeaderID] = useState(hId);


    useEffect(() => {
        if (headerId !== undefined) {
            getAllDetailsByHeaderId(headerId)
                .then(response => {
                    setDetails(prevState => prevState.concat(response.content));
                    setShowDetail(true);
                }).catch(error => showError(error))
        }

    }, [hId]);

    // CRUD operations
    const addDetail = detail => {
        setDetails([...details, detail]);
        setCurrentDetail(initialDetailFormState);
    };

    const deleteDetail = detail => {
        //TODO کنترل لازم بودن setDetail اول
        setDetails(details.filter(de => de.id !== detail.id));
        deleteDetailApi(headerId, detail.id)
            .then(response => {
                    console.log('DeleteDetail Response :', response);
                    setDetails(details.filter(de => de.id !== detail.id));
                    toast.success('اطلاعات با موفقیت حذف شد');
                }
            ).catch(error => showError(error));
    };

    const addHeader = (hid) => {
        console.log('Header ID:', hid);
        setShowDetail(true);
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
        },
        {
            title: 'نظر کارشناس',
            dataIndex: 'srdComment',
            key: 'srdComment',
        },
        {
            title: 'پاسخ شعبه',
            dataIndex: 'srdShobComment',
            key: 'srdShobComment',
        },
        {
            title: 'عملیات',
            dataIndex: 'id',
            key: 'id',
            render: (text, record) => {
                return (
                    <div>
                        <FileTextTwoTone  style={{marginLeft: 5}}
                              onClick={() => {
                                  // console.log(record);
                                  showModal(record);
                                  // this.setState({currentDetail: record});
                              }}/>
                        <Popconfirm
                            title="آیا از حذف مطمئن هستید؟"
                            onConfirm={() => {
                                deleteDetail(record);
                            }}
                            // onCancel={this.cancel}
                            okText="بله"
                            cancelText="خیر"
                        >
                            <DeleteTwoTone  twoToneColor='#eb2f96'/>
                        </Popconfirm>
                    </div>
                );
            }
        }
    ];

    const showModal = (record) => {
        console.log('Detail', record);
        setVisible(true);
        setCurrentDetail(record);
        setShobComment(record.srdShobComment);
    };

    const handleOk = e => {
        console.log('Shob Comment:', shobComment);
        addShobComment(headerId, currentDetail.id, shobComment)
            .then(response => {
                    console.log('ShobCommentDetail Response :', response);
                    toast.success('توضیحات با موفقیت ثبت شد');
                }
            ).catch(error => showError(error));
        setVisible(false);
    };

    const handleCancel = e => {
        console.log(e);
        setVisible(false);
    };

    const onChange = ({target: {value}}) => {
        setShobComment(value);
    };

    let user = useContext(UserContext);
    let showDetailForm = hasRole(user,[ConfirmRoles.ROLE_ED_BOSS]);

    return (
        <div className='App'>
            <SupHeader2 headerId={headerId} showDetail={showDetail} addHeader={addHeader}/>
            {showDetail ?
                <div>
                    <Divider orientation='left'>جزئیات گزارش</Divider>
                    {showDetailForm ?
                        <SupDetailForm currentDetail={currentDetail} headerId={headerId}
                                       addDetail={addDetail}/>
                        : null}
                    <Table dataSource={details} rowKey='id' columns={columns} size="small"
                           style={{width: '100%'}}/>
                </div>
                :
                null}
            {/*<ShobComment headerId={headerId} detailId={currentDetail.id} shobComment={shobComment} showModal={visible}/>*/}
            <Modal
                title="جزئیات"
                style={{direction: 'ltr'}}
                bodyStyle={{direction: 'rtl'}}
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <TextArea
                    value={shobComment}
                    placeholder="پاسخ شعبه"
                    onChange={onChange}
                    autoSize={{minRows: 2, maxRows: 6}}
                />
            </Modal>
        </div>
    );
};

export default NewSup;