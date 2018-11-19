import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

const sideDrawer = (props) => {
    const attachedClasses = [classes.SideDrawer, props.show ? classes.Open : classes.Close];
    return (
        <Auxiliary>
            <BackDrop show={props.show} clicked={props.closed} />
            <div className={attachedClasses.join(' ')} onClick={props.closed} >
                <div className={classes.Logo}><Logo /></div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuthenticated} />
                </nav>
            </div>
        </Auxiliary>
    );
};

export default sideDrawer;
