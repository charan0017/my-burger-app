import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions';

const createInputObject = (elementType, type, placeholder, validation, validationErrorMsg = 'Please enter valid data!!', valid, value = '') => ({
    elementType: elementType ? elementType : 'input',
    elementConfig: Array.isArray(type) ? {
        options: type.map(option => ({
                value: option,
                displayValue: option.charAt(0).toUpperCase() + option.slice(1).toLowerCase()
            })),
    } : {
        type: type ? type : 'text',
        placeholder: placeholder ? placeholder : ''
    },
    value,
    validation: validation ? validation : {},
    valid,
    touched: false,
    validationErrorMsg: 'Please enter a valid ' + (validationErrorMsg ? validationErrorMsg : 'data') + '!!'
});

class ContactData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderForm: {
                name: createInputObject('input', 'text', 'Your Name', {minLength: 3}, 'Name'),
                street: createInputObject('input', 'text', 'Your Street', {required: true}, 'Street'),
                zipCode: createInputObject('input', 'text', 'ZIP Code', {minLength: 5, maxLength: 6}, 'ZIP Code'),
                country: createInputObject('input', 'text', 'Country', {required: true}, 'Country'),
                email: createInputObject('input', 'email', 'Your Mail', {required: true, regex: '@.'}, 'Address'),
                deliveryMethod: createInputObject('select', ['fastest', 'cheapest'], null, null, '', true, 'fastest')
            },
            formValidationMessage: 'Please enter a valid data to make an ORDER!!',
        }
    }

    orderHandler = (event) => {
        event.preventDefault();
        const orderData = {};
        Object.keys(this.state.orderForm).map(orderFormId =>
            orderData[orderFormId] = this.state.orderForm[orderFormId].value
        );
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData,
            userId: this.props.userId,
        };
        this.props.onOrderBurgerInit(order, this.props.token);
    };

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let formValidationMessage = null;
        for (let formElementKey in updatedOrderForm) {
            if (!updatedOrderForm[formElementKey].valid) {
                formValidationMessage = updatedOrderForm[formElementKey].validationErrorMsg;
                break;
            }
        }
        this.setState({orderForm: updatedOrderForm, formValidationMessage});
    };

    checkValidity(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.regex) {
            isValid = rules.regex
                .split('')
                .every(char => value.split('').indexOf(char) > 0)
                && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    render() {
        const formElements = Object.keys(this.state.orderForm)
            .map(key => ({id: key, config: this.state.orderForm[key]}));
        const formValidationErrorMessage = !!this.state.formValidationMessage
            ? <h5 style={{
                color: 'salmon',
                padding: '0px',
                margin: '0px'
            }}>{this.state.formValidationMessage}</h5>
            : <h3 style={{
                color: 'green',
                padding: '0px',
                margin: '0px'
            }}>✔</h3>;
        let form = (
            <form onSubmit={this.orderHandler}>
                {formValidationErrorMessage}
                {formElements.map(formElement =>
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={!!formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                )}
                <Button btnType="Success" disabled={!!this.state.formValidationMessage}>ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch) => ({
    onOrderBurgerInit: (orderData, token) => dispatch(actions.purchaseBurgerInit(orderData, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
