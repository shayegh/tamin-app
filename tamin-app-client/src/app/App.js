import React, {useEffect, useState} from 'react';
import './App.css';
import {Route, Switch, useHistory, withRouter} from 'react-router-dom';

import {getCurrentUser} from '../util/api';
import {ACCESS_TOKEN} from '../constants';
import Login from '../user/login/Login';
import Profile from '../user/profile/Profile';
import AppHeader from '../common/AppHeader';
import PrivateRoute from '../common/PrivateRoute';
import {toast} from 'react-toastify';
import {Layout} from 'antd';
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

const App = () => {
    const [currentUser, setCurrentUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        loadCurrentUser();
        removeLoader();

    },[]);

    const loadCurrentUser = (roles) => {
        getCurrentUser()
            .then(response => {
                console.log('load user response :', response);
                response = {...response, roles};
                setCurrentUser(response);
                setIsAuthenticated(true);

            }).catch(error => {
            showError(error);
        });
    };

    const removeLoader = () => {
        const ele = document.getElementById('ipl-progress-indicator');
        if (ele) {
            // fade out
            ele.classList.add('available');
            ele.outerHTML = ''
        }
    };


    let history = useHistory();

    const handleLogout = (redirectTo = "/", notificationType = "success", description = "You're successfully logged out.") => {
        localStorage.removeItem(ACCESS_TOKEN);
        setCurrentUser(null);
        setIsAuthenticated(false);
        history.push(redirectTo);
        toast.success("با موفقیت خارج شدید");
    };

    const handleLogin = (userRole) => {
        toast.success("با موفقیت وارد شدید");
        loadCurrentUser(userRole);
        history.push("/suplist");
    };

    return (
        <Layout className="app-container">
            <UserProvider value={currentUser}>
                <AppHeader isAuthenticated={isAuthenticated}
                           currentUser={currentUser}
                           onLogout={handleLogout}/>
                <Content className="app-content">
                    <div className="container">
                        <Switch>
                            <Route exact path="/"
                                   render={(props) => <Login onLogin={handleLogin} {...props} />}/>
                            <Route path="/login"
                                   render={(props) => <Login onLogin={handleLogin} {...props} />}/>
                            <PrivateRoute authenticated={isAuthenticated}
                                          handleLogout={handleLogout}
                                          path="/signup/:username?" component={SignUpForm}/>
                            <Route path="/users/:username"
                                   render={(props) => <Profile isAuthenticated={isAuthenticated}
                                                               currentUser={currentUser} {...props} />}/>
                            {
                                routs.map((rout) => (
                                    <Route {...rout}/>
                                ))
                            }
                        </Switch>
                    </div>
                </Content>
            </UserProvider>
        </Layout>
    );
};

export default withRouter(App);