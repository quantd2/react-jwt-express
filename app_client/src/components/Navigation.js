import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { signOutAction } from '../Actions/SignOut';

class Navigation extends Component {

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  logOut() {
    this.props.signOutAction();
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  navbarLinks() {
    if (this.props.authenticated) {
      return (
        <React.Fragment>
          <NavItem>
            <NavLink key="secret" href="/secret">Secret</NavLink>
          </NavItem>
          <NavItem>
            <NavLink key="signout" href="/logout" onClick={() => this.logOut()}>Logout</NavLink>
          </NavItem>
        </React.Fragment>
      )
    }
      return (
        <React.Fragment>
          <NavItem>
            <NavLink key="signin" href="/signin">Sign In</NavLink>
          </NavItem>
          <NavItem>
            <NavLink key="signup" href="/signup">Sign Up</NavLink>
          </NavItem>
        </React.Fragment>
      )
  }

  render() {
    return (
      <Navbar color="faded" light>
        <NavbarBrand href="/" className="mr-auto">Xiro App</NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
        <Collapse isOpen={!this.state.collapsed} navbar>
          <Nav navbar>
            {this.navbarLinks()}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps, { signOutAction } )(Navigation);
