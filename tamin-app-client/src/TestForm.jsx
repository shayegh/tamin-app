import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import NewSup from "./supervision/NewSup";
import SupList from "./supervision/SupList";

const TestForm = () => {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={SupList}/>
                <Route path="/newsuprep" component={NewSup}/>
            </Switch>
        </div>
    );
};

export default TestForm;
