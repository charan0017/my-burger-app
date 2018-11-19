import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    state = {
        showSideDrawer: false
    };

    sideDrawerOpenedHandler = () => {
        this.setState({showSideDrawer: true});
    };

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    };

    render() {
        return (
            <Auxiliary>
                <Toolbar
                    isAuthenticated={this.props.isAuthenticated}
                    sideDrawerOpened={this.sideDrawerOpenedHandler} />
                <SideDrawer
                    isAuthenticated={this.props.isAuthenticated}
                    show={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.token,
});

export default connect(mapStateToProps)(Layout);
