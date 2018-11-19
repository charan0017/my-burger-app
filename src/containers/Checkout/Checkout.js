import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as actions from "../../store/actions";

class Checkout extends Component {
    checkoutContinuedHandler = () => {
        this.props.history.push(this.props.match.url + '/contact-data');
    };

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    render() {
        let summary = <Redirect to="/"/>;
        if (this.props.purchased) {
            this.props.onUpdateBuildingBurger();
            return summary;
        }
        if (this.props.ings) {
            summary = (
                <div>
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Route
                        path={this.props.match.url + '/contact-data'}
                        component={ContactData} />
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = (state) => ({
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
});

const mapDispatchToProps = (dispatch) => ({
    onUpdateBuildingBurger: () => dispatch(actions.updateBuildingBurger(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
