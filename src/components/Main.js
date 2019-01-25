import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Question from './question';
import Result from './result';

function Main({}) {
    return (
        <main>
            <Switch>
                <Route path="/question" component={Question} />
                <Route path="/result" component={Result} />
            </Switch>
        </main>
    )
}

export default Main;