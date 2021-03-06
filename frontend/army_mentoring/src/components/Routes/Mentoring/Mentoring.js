import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MentoringList from './MentoringList';
import MentoringIntroduction from './MentoringIntroduction';
import MakeMentoring from './MakeMentoring';

function Mentoring({match}){
    return (
        <Switch>
            <Route path={`${match.url}/make`} component={MakeMentoring}></Route>
            <Route path={`${match.url}/mentoring/:id`} component={MentoringIntroduction}></Route>
            <Route path={`${match.url}`} component={MentoringList}></Route>
        </Switch>
    )
}

export default Mentoring;