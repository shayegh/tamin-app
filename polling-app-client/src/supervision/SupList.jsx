import React, {Component} from 'react';
import {POLL_LIST_SIZE} from "../constants";
import {deleteHeader, getAllHeaders, getUserCreatedPolls, getUserVotedPolls} from "../util/APIUtils";
import {Button, Form, Icon, Input, Popconfirm, Table} from "antd";
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
            currentVotes: [],
            isLoading: false,
            searchText: '',
            searchedColumn: '',
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
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    جستجو
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    بازنشانی
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
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
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
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
        this.setState({ searchText: '' });
    };

    columns = [
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
                            <Icon type="edit" theme="twoTone" style={{marginLeft: 5}}/>
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
                            <Icon type="delete" theme="twoTone" twoToneColor='#eb2f96'/>
                        </Popconfirm>
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


    render() {
        return (
            <div className="App">
                {this.state.isLoading ?
                    <LoadingIndicator/> :
                    <div>
                        <Table dataSource={this.state.headers} rowKey='id' columns={this.columns} size="small"/>
                        <FormItem>

                            <Button htmlType="submit" type="primary">
                                <Link to='/newsuprep'>
                                    جدید
                                </Link>
                            </Button>
                        </FormItem>
                    </div>}

            </div>
        );
    }
}

export default SupList;