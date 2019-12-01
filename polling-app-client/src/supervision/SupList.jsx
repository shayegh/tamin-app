import React, {Component} from 'react';
import {POLL_LIST_SIZE} from "../constants";
import {deleteHeader, getAllHeaders, getUserCreatedPolls, getUserVotedPolls} from "../util/APIUtils";
import {Button, Form, Icon, Input, Modal, Popconfirm, Table} from "antd";
import LoadingIndicator from "../common/LoadingIndicator";
import {Link} from "react-router-dom";
import {toast} from 'react-toastify';
import Highlighter from "react-highlight-words";
import {compareByAlph, compareByNum} from "../util/Helpers";

const FormItem = Form.Item;

class SupList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            headers: [],
            page: 0,
            size: 10,
            totalElements: 0,
            totalPages: 0,
            last: true,
            isLoading: false,
            searchText: '',
            searchedColumn: '',
            visible: false,
            currentRecord: {}
        };

    }

    loadHeaderList = (page = 0, size = POLL_LIST_SIZE) => {
        let promise;
        if (this.props.username) {
            if (this.props.type === 'USER_CREATED_POLLS') {
                promise = getUserCreatedPolls(this.props.username, page, size);
            } else if (this.props.type === 'USER_VOTED_POLLS') {
                promise = getUserVotedPolls(this.props.username, page, size);
            }
        } else {
            promise = getAllHeaders(page, size);
        }

        if (!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise
            .then(response => {
                const headers = this.state.headers.slice();

                this.setState({
                    headers: headers.concat(response.content),
                    page: response.page,
                    size: response.size,
                    totalElements: response.totalElements,
                    totalPages: response.totalPages,
                    last: response.last,
                    isLoading: false
                })
            }).catch(error => {
            this.setState({
                isLoading: false
            })
        });

    };

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
                    جستجو
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{width: 90}}>
                    بازنشانی
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{color: filtered ? '#1890ff' : undefined}}/>
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text => (
            (this.state.searchedColumn === dataIndex) ?
                <Highlighter
                    highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
                : text
        ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({searchText: ''});
    };

    columns = [
        {
            title: 'ردیف',
            key: 'index',
            render :(text, record, index) => index+1,
        },
        {
            title: ' موضوع بازدید',
            dataIndex: 'surveySubject',
            key: 'surveySubject',
        },
        {
            title: 'شماره حکم ماموریت',
            dataIndex: 'missionNo',
            key: 'missionNo',
            sorter: (a, b) => compareByNum(a.missionNo, b.missionNo)
        },
        {
            title: ' شعبه',
            dataIndex: 'brchName',
            key: 'brchName',
            sorter: (a, b) => compareByAlph(a.unitName, b.unitName),
            ...this.getColumnSearchProps('brchName'),
        },
        {
            title: ' واحد',
            dataIndex: 'unitName',
            key: 'unitName',
            sorter: (a, b) => compareByAlph(a.unitName, b.unitName)
        },
        {
            title: ' تاریخ بازدید',
            dataIndex: 'surveyDate',
            key: 'surveyDate',
            sorter: (a, b) => compareByAlph(a.surveyDate, b.surveyDate)
        },
        {
            title: 'تاریخ بازدید قبلی',
            dataIndex: 'preSurveyDate',
            key: 'preSurveyDate',
        },
        {
            title: 'کارشناس ناظر',
            dataIndex: 'supervisorName',
            key: 'supervisorName',
            // defaultSortOrder: 'descend',
            // sorter: (a, b) => a.age - b.age,
        },
        {
            title: ' تاریخ تنظیم گزارش',
            dataIndex: 'surveyCreateDate',
            key: 'surveyCreateDate',
        },
        {
            title: 'عملیات',
            dataIndex: 'id',
            key: 'id',
            render: (text, record) => {
                return (
                    <div>
                        <Link to={`/newsuprep/${text}`}>
                            {/*<Tooltip title='ویرایش'>*/}
                                <Icon type="edit" theme="twoTone" style={{marginLeft: 5}}/>
                            {/*</Tooltip>*/}
                        </Link>
                        <Popconfirm
                            title="آیا از حذف مطمئن هستید؟"
                            onConfirm={() => {
                                this.deleteHeader(record);
                            }}
                            // onCancel={this.cancel}
                            okText="بله"
                            cancelText="خیر"

                        >
                            <Icon type="delete" theme="twoTone" twoToneColor='#eb2f96' style={{marginLeft: 5}}/>
                        </Popconfirm>
                        <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" onClick={() => {
                            this.showModal(record)
                        }}/>
                    </div>
                )
            }
        }
    ];

    // cancel = (e) => {
    //     // console.log(e);
    //     // message.error('Click on No');
    // };

    deleteHeader = (header) => {
        let promise = deleteHeader(header.id);
        promise.then(response => {
                console.log('DeleteHeader Response :', response);
                const headers = this.state.headers.filter(hr => hr.id !== header.id);
                this.setState({headers});
                toast.success('اطلاعات با موفقیت حذف شد');
            }
        ).catch(error => {
            console.log('Error :', error);
            toast.error('error');
            this.setState({
                isLoading: false
            });
        })

    };


    componentDidMount() {
        this.loadHeaderList();
    }

    showModal = (record) => {
        console.log(record);
        this.setState({
            visible: true,
            currentRecord: record
        });
    };

    handleOk = e => {
        console.log(e);
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

    render() {
        return (
            <div className="App">
                {this.state.isLoading ?
                    <LoadingIndicator/> :
                    <div>
                        <Table dataSource={this.state.headers} rowKey='id' columns={this.columns}
                               bodyStyle={{width: '100%'}} size="small"/>
                        <FormItem>

                            <Button htmlType="submit" type="primary">
                                <Link to='/newsuprep'>
                                    جدید
                                </Link>
                            </Button>
                        </FormItem>
                    </div>}
                <Modal
                    title="جزئیات"
                    style={{direction: 'ltr'}}
                    bodyStyle={{direction: 'rtl'}}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <input/>
                    <p>{this.state.currentRecord.id}</p>
                    <p> :موضوغ{this.state.currentRecord.surveySubject}</p>
                </Modal>
            </div>
        );
    }
}

export default SupList;