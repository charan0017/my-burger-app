import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './Auth.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Auxilary from '../../hoc/Auxiliary/Auxiliary';
import * as actions from '../../store/actions';

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

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            controls: {
                email: createInputObject('input', 'email', 'Your Email', {required: true, regex: '@.'}, 'Email Address'),
                password: createInputObject('input', 'password', 'Your Password', {required: true, minLength: 6}, 'Password'),
            },
            isSignUp: true,
        }
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                touched: true,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
            },
        };
        this.setState({ controls: updatedControls });
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

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuthUserClicked(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    };

    switchAuthModeHandler = () => {
        this.setState(prevState => ({
            isSignUp: !prevState.isSignUp,
        }));
    };

    render() {
        if (this.props.isAuthenticated) return <Redirect to={this.props.authRedirectPath} />;
        const formElements = Object.keys(this.state.controls)
            .map(key => ({id: key, config: this.state.controls[key]}));
        const form = formElements.map(formElement =>
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={!!formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        );
        const authError = this.props.authError && !this.props.loading ? <p>{this.props.authError.message}</p> : null;
        let handlers = (
            <Auxilary>
                <form onSubmit={this.submitHandler}>
                    <Button btnType="Success">
                        {!this.state.isSignUp ? 'Sign In' : 'Sign Up'}
                    </Button>
                </form>
                <hr />
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
                    Switch to {this.state.isSignUp ? 'Sign In' : 'Sign Up'}
                </Button>
            </Auxilary>
        );
        if (this.props.loading) {
            handlers = <Spinner/>;
        }
        return (
            <div className={classes.Auth}>
                {authError}
                {form}
                {handlers}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.token,
    authError: state.auth.error,
    loading: state.auth.loading,
    authRedirectPath: state.auth.redirectPath,
    buildingBurger: state.burgerBuilder.buildingBurger,
});

const mapDispatchToProps = (dispatch) => ({
    onAuthUserClicked: (email, password, isSignUp) => dispatch(actions.authUser(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
