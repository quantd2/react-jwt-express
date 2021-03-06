import React, { Component } from 'react';
import { signUpAction } from '../../Actions/SignUp';
import { connect } from 'react-redux';
import styled from 'styled-components';
import FieldForm from './SignupFieldForm';


export const Wrapper = styled.div`
    width: 345px;
    height: auto;
    margin: 20px;
    background-color: #9fe7a4;
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5.5px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    transition: 200ms ease-in-out;
    font-weight: 900;
    text-shadow: 0px 0px 3px #000;

`

class Signup extends Component {
  submit = (values) => {
    this.props.signUpAction(values, this.props.history);
  }

  render() {
    return (
      <div align="center" className="form">
        <h2>Sign Up</h2>
        <Wrapper>
          <FieldForm
            onSubmit={ this.submit }
          />
        </Wrapper>
      </div>
    );
  }
}


export default connect(null, { signUpAction })(Signup);
