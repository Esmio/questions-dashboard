import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css';
import App from './App';

import AuthRoute from './components/AuthRoute';
import Primary from './components/Index';
import LoginPage from './components/LoginPage';


// import * as serviceWorker from './serviceWorker';

const token = Cookies.get('token');
const logged = !!token;

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/login" component={LoginPage} />
            <AuthRoute path="/" logged={logged} component={Primary} />
        </Switch>
    </BrowserRouter>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
