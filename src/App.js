//import logo from './logo.svg';
import './App.css';
import React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import MainLayout from './page/main_layout';
import Home from './page/home';
import Router from './page/router';

function App() {
    return (
        <HashRouter>
            <MainLayout>
                <Switch>
                    <Route path={'/router_R:router_id'}>
                        <Router />
                    </Route>
                    <Route path={'/home'}>
                        <Home />
                    </Route>
                    <Redirect to={'/home'}/>
                </Switch>
            </MainLayout>
        </HashRouter>
    );
}

export default App;

/**
<div className="App">
    <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
        >
            Learn React
        </a>
    </header>
</div>
 */
