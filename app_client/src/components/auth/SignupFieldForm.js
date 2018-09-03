import React from 'react';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';
import FieldInput from './FieldInput';



const ButtonWrapper = styled.div`
    margin: 20px 0 5px 0;
    display: flex;
    justify-content: center;
    width: 100%;
`


const SubmitButton = styled.button`
    width: 114px;
    height: 43px;
    margin: 15px 18px 5px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 250 ease-in-out;
    border: none;
    box-shadow: 0 3px 3px rgba(0,0,0,0.16), 0 3px 3px rgba(0,0,0,0.23);

    &:hover {
        transition: all 250ms ease-in-out;
        color: #00BAFF;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        background-color: #dbdbdb;
    }
`


let SigninFieldForm = (props) => {

    const { handleSubmit } = props;

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Field
                    name="name"
                    component={FieldInput}
                    placeholder="name"
                    type="text"
                />
                <Field
                    name="email"
                    component={FieldInput}
                    placeholder="email"
                    type="email"
                />
                <Field
                    name="password"
                    component={FieldInput}
                    placeholder="password"
                    type="password"
                />
            </form>
            <ButtonWrapper>
                <SubmitButton onClick={handleSubmit} type="button">Sign in</SubmitButton>
            </ButtonWrapper>
        </div>
    )
}

function validate(values) {

    let errors = {};

    if (!values.name || values.name === '') {
        errors.email =  "Oops! Looks like you forgot the name!"
    }

    if (!values.email || values.email === '') {
        errors.email =  "Oops! Looks like you forgot the email!"
    }

    if (!values.password || values.password === '') {
        errors.password =  "Oops! Looks like you forgot the password!"
    }

    return errors;
}

SigninFieldForm = reduxForm({
    validate,
    form: 'signup'
})(SigninFieldForm)

export default SigninFieldForm;
