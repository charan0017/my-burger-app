import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggler from '../SideDrawer/DrawerToggler/DrawerToggler';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggler clicked={props.sideDrawerOpened} />
        <div className={classes.Logo}><Logo /></div>
        <nav className={classes.DesktopNav}>
            <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
    </header>
);

export default toolbar;
