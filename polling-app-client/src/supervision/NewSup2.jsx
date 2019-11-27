import React, {Component} from 'react';
import SupHeader2 from "./SupHeader2";
import {Icon, Popconfirm, Table} from "antd";
import SupDetailForm from "./SupDetail";
import {toast} from "react-toastify";

const initialDetailFormState = {
    id: null,
    srdSubject: '',
    srdSubjectCount: 0,
    srdSubjectErrorCount: 0,
    srdComment: ''
};

export default class NewSup2 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showDetail: false,
            currentDetail: {},
            headerId:null,
            details: []
        }

    }

    addHeader = (hid) => {
        this.setState({
            showDetail: true,
            headerId:hid
        });
        // console.log('Header ID:', hid);
        // setHeaderID(hid);

    };

    addDetail = detail => {
        let {details} = this.state;
        detail.id = details.length + 1;
        this.setState({
            details: [...details, detail],
            currentDetail: initialDetailFormState
        });
        toast.success('اطلاعات با موفقیت اضافه شد');

    };

    deleteDetail = fr => {
        // setEditing(false)
        let {details} = this.state;
        this.setState({details: details.filter(detail => detail.id !== fr.id)});
        toast.success('اطلاعات با موفقیت حذف شد')
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
                                  this.setState({currentDetail:record});
                              }}/>
                        <Popconfirm
                            title="آیا از حذف مطمئن هستید؟"
                            onConfirm={() => {
                                this.deleteDetail(record);
                            }}
                            onCancel={this.cancel}
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

    render() {
        let headerId = this.props.match.params.headerId;
        let {showDetail,currentDetail,details} = this.state;
        return (
            <div className='App'>
                <SupHeader2 headerId={headerId} showDetail={showDetail} addHeader={this.addHeader}/>
                {showDetail ?
                    <div>
                        <SupDetailForm currentDetail={currentDetail} addDetail={this.addDetail}/>
                        <Table dataSource={details} rowKey='id' columns={this.columns} size="small"/>
                    </div>
                    :
                    null}
            </div>
        );
    }
}
