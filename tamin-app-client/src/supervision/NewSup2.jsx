import React, {Component} from 'react';
import SupHeader2 from "./SupHeader2";
import {Divider, Form, Icon, Input, Modal, Popconfirm, Table} from "antd";
import SupDetailForm from "./SupDetail";
import {toast} from "react-toastify";
import {addShobComment, deleteDetail, getAllDetailsByHeaderId} from '../util/api';
import {showError} from '../util/Helpers';
import {UserContext} from "../user/UserContext";
import {ConfirmRoles} from "../constants";

const initialDetailFormState = {
    id: null,
    srdSubject: '',
    srdSubjectCount: 0,
    srdSubjectErrorCount: 0,
    srdComment: '',
    srdShobComment: ''
};

const FormItem = Form.Item;
const {TextArea} = Input;

class NewSup2 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showDetail: false,
            visible: false,
            currentDetail: {},
            headerId: props.match.params.headerId,
            details: [],
            shobComment: ''
        }

    }

    static contextType = UserContext;

    componentDidMount() {
        let {headerId} = this.state;
        console.log('Header ID', headerId);
        if (headerId !== undefined) {
            getAllDetailsByHeaderId(headerId)
                .then(response => {
                    const details = this.state.details.slice();
                    this.setState({
                        details: details.concat(response.content),
                        showDetail: true
                    });
                }).catch(error => showError(error))
        }

    }

    addHeader = (hid) => {
        this.setState({
            showDetail: true,
            headerId: hid
        });
    };

    addDetail = detail => {
        let {details} = this.state;
        // detail.id = details.length + 1;
        this.setState({
            details: [...details, detail],
            currentDetail: initialDetailFormState
        });
    };

    deleteDetail = detail => {
        let {headerId, details} = this.state;
        this.setState({details: details.filter(de => de.id !== detail.id)});
        deleteDetail(headerId, detail.id)
            .then(response => {
                    console.log('DeleteDetail Response :', response);
                    this.setState({details: details.filter(de => de.id !== detail.id)});
                    toast.success('اطلاعات با موفقیت حذف شد');
                }
            ).catch(error => showError(error));
    };

    columns = [
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
            title: 'توضیحات شعبه',
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
                        <Icon type="file-text" theme="twoTone" style={{marginLeft: 5}}
                              onClick={() => {
                                  // console.log(record);
                                  this.showModal(record);
                                  // this.setState({currentDetail: record});
                              }}/>
                        <Popconfirm
                            title="آیا از حذف مطمئن هستید؟"
                            onConfirm={() => {
                                this.deleteDetail(record);
                            }}
                            // onCancel={this.cancel}
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
    cancel = (e) => {
        console.log(e);
        // message.error('Click on No');
    };
    showModal = (record) => {
        console.log('Detail', record);
        this.setState({
            visible: true,
            currentDetail: record,
            shobComment: record.srdShobComment
        });
    };

    handleOk = e => {
        let {headerId, currentDetail, shobComment} = this.state;
        console.log('Shob Comment:', shobComment);
        addShobComment(headerId, currentDetail.id, shobComment)
            .then(response => {
                    console.log('ShobCommentDetail Response :', response);
                    // this.setState({details: details.filter(de => de.id !== detail.id)});
                    toast.success('توضیحات با موفقیت ثبت شد');
                }
            ).catch(error => showError(error));
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };


    onChange = ({target: {value}}) => {
        this.setState({shobComment: value});
    };

    render() {
        // let hId = this.props.match.params.headerId;
        let {showDetail, currentDetail, details, headerId} = this.state;
        let {roles} = this.context;
        let showDetailForm = false;
        if (roles.includes(ConfirmRoles.ROLE_ED_BOSS))
            showDetailForm = true;
        // console.log('Details :', details);
        return (
            <div className='App'>
                <SupHeader2 headerId={headerId} showDetail={showDetail} addHeader={this.addHeader}/>
                {showDetail ?
                    <div>
                        <Divider orientation='left'>جزئیات گزارش</Divider>
                        {showDetailForm ?
                            <SupDetailForm currentDetail={currentDetail} headerId={headerId}
                                           addDetail={this.addDetail}/>
                            : null}
                        <Table dataSource={details} rowKey='id' columns={this.columns} size="small"
                               style={{width: '100%'}}/>
                    </div>
                    :
                    null}
                <Modal
                    title="جزئیات"
                    style={{direction: 'ltr'}}
                    bodyStyle={{direction: 'rtl'}}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    {/*<p> :موضوع{this.state.currentDetail.srdSubject}</p>*/}
                    {/*<FormItem*/}
                    {/*    required={true}*/}
                    {/*>*/}
                    <TextArea
                        value={this.state.shobComment}
                        placeholder="توضیحات واحد"
                        onChange={this.onChange}
                        autoSize={{minRows: 2, maxRows: 6}}
                    />
                    {/*</FormItem>*/}
                </Modal>
            </div>
        );
    }
}

export default NewSup2;
