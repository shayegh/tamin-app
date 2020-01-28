import React, {Component} from 'react';
import './App.css';
import {Route, Switch, withRouter} from 'react-router-dom';

import {getCurrentUser} from '../util/APIUtils';
import {ACCESS_TOKEN} from '../constants';
import Login from '../user/login/Login';
// import Signup1 from '../user/signup/Signup1';
import Profile from '../user/profile/Profile';
import AppHeader from '../common/AppHeader';
import LoadingIndicator from '../common/LoadingIndicator';
import PrivateRoute from '../common/PrivateRoute';
import {toast} from 'react-toastify';
import {Layout, notification} from 'antd';
import 'react-toastify/dist/ReactToastify.css';
import SignUpForm from '../user/signup/Signup';
import {UserProvider} from "../user/UserContext";
import {showError} from "../util/Helpers";
import routs from "../routs";

const {Content} = Layout;

toast.configure({
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    rtl: true,
    bodyClassName: 'toastBody'
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            isAuthenticated: false,
            isLoading: false
        };

        notification.config({
            placement: 'topRight',
            top: 70,
            duration: 3,
        });
    }

    removeLoader = () => {
        const ele = document.getElementById('ipl-progress-indicator');
        if (ele) {
            // fade out
            ele.classList.add('available');
            ele.outerHTML = ''
        }
    }
    ;

    loadCurrentUser = (roles) => {
        this.setState({
            isLoading: true
        });
        getCurrentUser()
            .then(response => {
                // console.log('load user response :', response);
                response = {...response, roles};
                this.setState({
                    currentUser: response,
                    isAuthenticated: true,
                    isLoading: false
                });
                this.removeLoader();
            }).catch(error => {
            showError(error);
            this.setState({
                isLoading: false
            });
            this.removeLoader();
        });
    };

    componentDidMount() {
        this.loadCurrentUser();
    }

    handleLogout = (redirectTo = "/", notificationType = "success", description = "You're successfully logged out.") => {
        localStorage.removeItem(ACCESS_TOKEN);

        this.setState({
            currentUser: null,
            isAuthenticated: false
        });

        this.props.history.push(redirectTo);

        toast.success("با موفقیت خارج شدید");
    };

    handleLogin = (userRole) => {
        toast.success("با موفقیت وارد شدید");
        // console.log('UserRole',userRole);
        this.loadCurrentUser(userRole);
        this.props.history.push("/suplist");
    };

    render() {
        if (this.state.isLoading) {
            return <LoadingIndicator/>;
        }
        return (
            <Layout className="app-container">
                <UserProvider value={this.state.currentUser}>
                    <AppHeader isAuthenticated={this.state.isAuthenticated}
                               currentUser={this.state.currentUser}
                               onLogout={this.handleLogout}/>

                    <Content className="app-content">
                        <div className="container">
                            <Switch>
                                <Route exact path="/"
                                       render={(props) => <Login onLogin={this.handleLogin} {...props} />}/>
                                <Route path="/login"
                                       render={(props) => <Login onLogin={this.handleLogin} {...props} />}/>
                                <PrivateRoute authenticated={this.state.isAuthenticated}
                                              handleLogout={this.handleLogout}
                                              path="/signup/:username?" component={SignUpForm}/>
                                <Route path="/users/:username"
                                       render={(props) => <Profile isAuthenticated={this.state.isAuthenticated}
                                                                   currentUser={this.state.currentUser} {...props} />}/>
                                {
                                    routs.map((rout)=>(
                                        <Route {...rout}/>
                                    ))
                                }
                            </Switch>
                        </div>
                    </Content>
                </UserProvider>
            </Layout>
        );
    }
}

export default withRouter(App);
