import React from 'react';

import classes from './Modal.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (
    <Auxiliary>
        <Backdrop
            show={props.show}
            clicked={props.modalClosed} />
        <div
            className={classes.Modal}
            style={{
                transform: `transformY(${props.show ? 0 : -100}vh)`,
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
    </Auxiliary>
);

export default modal;
