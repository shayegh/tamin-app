import React, {Component} from 'react';
import {ConfirmRoles, POLL_LIST_SIZE, SRStatus} from "../constants";
import {confirmHeader, deleteHeader, getAllHeaders} from "../util/api";
import {Button, Form, Icon, Input, Popconfirm, Table} from "antd";
import {Link} from "react-router-dom";
import {toast} from 'react-toastify';
import Highlighter from "react-highlight-words";
import {compareByAlph, compareByNum, showError} from "../util/Helpers";

import './Supervision.scss'
import ExportExcel from "../common/components/ExportExcel";
import {UserContext} from "../user/UserContext";

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
            // visible: false,
            currentRecord: {}
        };

    }

    static contextType = UserContext;

    loadHeaderList = (page = 0, size = POLL_LIST_SIZE) => {
        this.setState({
            isLoading: true
        });

        getAllHeaders(page, size)
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
            });
            showError(error);
        });

    };

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`جستجو `}
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
            title: '#',
            key: 'index',
            render: (text, record, index) => index + 1,
        },
        {
            title: ' موضوع بازدید',
            dataIndex: 'surveySubject',
            key: 'surveySubject',
            align: 'right',
            ...this.getColumnSearchProps('surveySubject'),
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
            sorter: (a, b) => compareByAlph(a.brchName, b.brchName),
            ...this.getColumnSearchProps('brchName'),
            align: 'right',
        },
        {
            title: ' واحد',
            dataIndex: 'unitName',
            key: 'unitName',
            sorter: (a, b) => compareByAlph(a.unitName, b.unitName),
            align: 'right',
        },
        {
            title: ' تاریخ بازدید',
            dataIndex: 'surveyDate',
            key: 'surveyDate',
            //  sorter: (a, b) => compareDate(a.surveyDate, b.surveyDate)
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
            align: 'right',
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
                            {record.status === 'NEW' ?
                                <Icon type="edit" theme="twoTone" style={{marginLeft: 5}}/>
                            :
                                <Icon type="eye"  twoToneColor='#eb2f96' style={{marginLeft: 5}}/>
                            }
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
                        <Popconfirm
                            title="آیا از تایید و ارسال مطمئن هستید؟"
                            onConfirm={() => {
                                this.confirmHeader(text);
                            }}
                            // onCancel={this.cancel}
                            okText="بله"
                            cancelText="خیر"

                        >
                            <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"/>
                        </Popconfirm>
                    </div>
                )
            }
        }
    ];


    deleteHeader = (header) => {
        let promise = deleteHeader(header.id);
        this.setState({
            isLoading: true
        });
        promise.then(response => {
                console.log('DeleteHeader Response :', response);
                const headers = this.state.headers.filter(hr => hr.id !== header.id);
                this.setState({headers, isLoading: false});
                toast.success('اطلاعات با موفقیت حذف شد');
            }
        ).catch(error => {
            showError(error);
            this.setState({
                isLoading: false
            });
        })

    };

    confirmHeader = (headerId) => {
        console.log('Context : ',this.context);
        let {roles} = this.context;
        let st = '';
        if (roles.includes(ConfirmRoles.ROLE_ED_BOSS))
            st = {status: SRStatus.ED_BOSS_CONFIRM};
        else if (roles.includes(ConfirmRoles.ROLE_SHOB_BOSS))
            st = {status: SRStatus.SHOB_BOSS_CONFIRM};
        else if (roles.includes(ConfirmRoles.ROLE_SHOB_UNIT_BOSS))
            st = {status: SRStatus.SHOB_UNIT_BOSS_CONFIRM};

        confirmHeader(st, headerId).then(response => {
            const headers = this.state.headers.map(h =>
                h.id === headerId
                    ? {...h, status: st.status}
                    : h
            );
            this.setState({headers});
            toast.success('اطلاعات با موفقیت تایید شد');
        }).catch(error => {
            showError(error)
        })

    };


    componentDidMount() {
        this.loadHeaderList();
    }


    render() {
        return (
            <div className="App">
                <ExportExcel cols={this.columns} data={this.state.headers} fileName='SRList'
                             style={{float: "left", cursor: "pointer", fontSize: '18px'}}/>
                <Table dataSource={this.state.headers}
                       rowKey={record => record.id} columns={this.columns}
                       bodyStyle={{width: '100%'}} size="small" loading={this.state.isLoading}
                       rowClassName={
                           (record, index) => {
                                return record.status;
                               // if (record.status === SRStatus.ED_BOSS_CONFIRM)
                               //     return 'ed_boss_confirm_report'
                           }}
                       pagination={{
                           showSizeChanger: true,
                           hideOnSinglePage:true,
                       }}
                />
                <FormItem style={{float: "left"}}>
                    <Button htmlType="submit" type="primary">
                        <Link to='/newsuprep'>
                            جدید
                        </Link>
                    </Button>
                </FormItem>
            </div>
        );
    }
}

export default SupList;