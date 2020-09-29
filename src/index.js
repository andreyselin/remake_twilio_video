import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { VideoApp } from './components/VideoApp';
import { AppStateProvider } from "./state";

import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from "./theme";


ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
            <AppStateProvider>
                <Switch>
                    <Route exact path="/">
                        <VideoApp />
                    </Route>
                    <Route path="/room/:URLRoomName">
                        <VideoApp />
                    </Route>
                    <Redirect to="/" />
                </Switch>
            </AppStateProvider>
        </Router>
    </MuiThemeProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
