import React, { Component } from "react";
import { Header, TaskList, EventList, Dashboard, CandidateList} from './components'
import {MuiThemeProvider, Tabs, Tab, AppBar,NoSsr,Typography, withStyles} from '@material-ui/core';
import { Route, withRouter, Switch, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { theme } from "./glTheme";
import { ROUTES } from './consts';
import {compose} from 'recompose'

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

class App extends Component {

    items = [
        { title: 'Dashboard', route: ROUTES.DASHBOARD},
        { title: 'Candidates', route: ROUTES.CANDIDATES},
        { title: 'Events', route: ROUTES.EVENTS},
        { title: 'Task manager', route: ROUTES.TASKMANAGER},
    ]

    state = {
        value: 0
    };

    
    handleChange = (event, value) => {
        this.setState({ value });
    };

    getActiveTab(pathname) {
        return this.items.findIndex((el) => {
            return el.route === pathname
        })
    }
    render() {
        const {location: { pathname } } = this.props
    
        return (
        <MuiThemeProvider theme={theme}>
            <Header />      
            <NoSsr>
            <div>
                <AppBar position="static">
                    <Tabs variant="fullWidth" value={this.getActiveTab(pathname)} onChange={this.handleChange}>
                        {this.items.map((el, index) => {
                            return (
                            <Tab key={index} label={el.title} component={Link} to={el.route}/>
                        )})}
                    </Tabs>
                </AppBar>
                <Switch>
                    <Route exact path={ROUTES.DASHBOARD} component={Dashboard}/>
                    <Route exact path={ROUTES.CANDIDATES} component={CandidateList}/>
                    <Route exact path={ROUTES.EVENTS} component={EventList}/>
                    <Route exact path={ROUTES.TASKMANAGER} component={TaskList}/>
                </Switch>
            </div>
            </NoSsr>
        </MuiThemeProvider>
        );
    }
}

export default compose(
    withRouter,
    withStyles(theme)
)(App)
