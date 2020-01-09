import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import './AppHeader.css';
import {Dropdown, Icon, Layout, Menu} from 'antd';

const Header = Layout.Header;

class AppHeader extends Component {
    constructor(props) {
        super(props);
    }

    handleMenuClick = ({key}) => {
        if (key === "logout") {
            this.props.onLogout();
        }
    };

    render() {
        let menuItems;
        if (this.props.currentUser) {
            menuItems = [
                <Menu.Item  style={{float: 'right'}} key="/">
                    <Link to="/">
                        <Icon type="home" className="nav-icon"/>
                    </Link>
                </Menu.Item>,
                <Menu.Item  style={{float: 'right'}} key="/profile" className="profile-menu">
                    <ProfileDropdownMenu
                        style={{float: 'right'}}
                        currentUser={this.props.currentUser}
                        handleMenuClick={this.handleMenuClick.bind(this)}/>
                </Menu.Item>,
                <Menu.Item key="/suplist">
                    <Link to="/suplist">لیست گزارشها</Link>
                </Menu.Item>,
                <Menu.Item key="/newsuprep">
                    <Link to="/newsuprep">ثبت گزارش</Link>
                </Menu.Item>
            ];
        } else {
            menuItems = [
                <Menu.Item key="/login">
                    <Link to="/login">ورود</Link>
                </Menu.Item>,
                // <Menu.Item key="/signup">
                //     <Link to="/signup">ثبت نام</Link>
                // </Menu.Item>,

            ];
        }

        return (
            <Header className="app-header">
                <div className="container">
                    <Menu
                        className="app-menu"
                        mode="horizontal"
                        selectedKeys={[this.props.location.pathname]}
                        style={{lineHeight: '64px'}}>
                        {menuItems}
                    </Menu>
                    <div className="app-title">
                        <Link to="/">نرم افزار نظارت</Link>
                    </div>
                </div>
            </Header>
        );
    }
}

function ProfileDropdownMenu(props) {
    const dropdownMenu = (
        <Menu onClick={props.handleMenuClick.bind(props)} className="profile-dropdown-menu">
            <Menu.Item key="user-info" className="dropdown-item" disabled>
                <div className="user-full-name-info">
                    {props.currentUser.name}
                </div>
                <div className="username-info">
                    @{props.currentUser.username}
                </div>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item key="profile" className="dropdown-item">
                <Link to={`/users/${props.currentUser.username}`}>Profile</Link>
            </Menu.Item>
            <Menu.Item key="changepass" className="dropdown-item">
                <Link to={`/changepass`}>تغییر کلمه عبور</Link>
            </Menu.Item>
            <Menu.Item key="logout" className="dropdown-item">
                خروج
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown
            overlay={dropdownMenu}
            trigger={['click']}
            getPopupContainer={() => document.getElementsByClassName('profile-menu')[0]}>
            <a className="ant-dropdown-link">
                <Icon type="user" className="nav-icon" style={{marginRight: 0}}/>
                <Icon type="down"/>
            </a>
        </Dropdown>
    );
}


export default withRouter(AppHeader);