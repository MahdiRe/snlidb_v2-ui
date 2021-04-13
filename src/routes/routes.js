import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Profile from '../pages/profile'
import GenerateQuery from '../pages/generate-query';
import Tables from'../pages/tables';

const Routes = () => (
    <Switch>
        <Route exact path='/profile' component={Profile} />
        <Route path='/query' component={GenerateQuery} />
        <Route path='/tables' component={Tables} />
    </Switch>
);

export default Routes;