import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import *  as actions from '../../store/actions/';

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    };

    updatePurchasableState = (ingredients) => {
        return Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .some(val => val > 0);
    };

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState( { purchasing: true } );
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
    };

    componentDidMount() {
        if (!this.props.buildingBurger) {
            this.props.onInitIngredients();
        }
    }

    render() {
        const disabledInfo = {...this.props.ings};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.props.error ? <strong><p style={{textAlign: 'center'}}>Ingredients can't be loaded, please try again !!</p></strong> : <Spinner />;
        if (this.props.ings) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        isAuthenticated={this.props.isAuthenticated}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        orderButtonDisabled={!this.updatePurchasableState(this.props.ings)}
                        order={this.purchaseHandler} />
                </Auxiliary>
            );
            orderSummary = <OrderSummary
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                ingredients={this.props.ings}/>;
        }
        return (
            <Auxiliary>
                {this.state.purchasing ?
                    <Modal
                        show={this.state.purchasing}
                        modalClosed={this.purchaseCancelHandler}>
                        {orderSummary}
                    </Modal> : null}
                {burger}
            </Auxiliary>
        );
    }
}

const mapStateToProps = (state) => ({
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    buildingBurger: state.burgerBuilder.buildingBurger,
    isAuthenticated: !!state.auth.token,
});

const mapDispatchToProps = (dispatch) => ({
    onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
    onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onPurchaseInit: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
