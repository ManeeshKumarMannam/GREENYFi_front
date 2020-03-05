import React, { useState } from "react";
import { withRouter, Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Form ,Button} from "react-bootstrap";
import logo from '../assets/images/logo.svg';
import logo2 from '../assets/images/logo-planet.svg'


const Header = () => {

    return (
        <React.Fragment>
            <header sticky="top">
                <div className="container">
                    <Navbar expand="lg">
                        <Navbar.Brand href="#home">
                            <img src={logo} alt="greenyfi" title="greenyfi" className="logo-animal"/>
                            <img src={logo2} alt="greenyfi" title="greenyfi" className="logo-planet"/>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                                <Nav.Link href="#home">ABOUT US</Nav.Link>
                                <Nav.Link href="#link">REPORT ISSUE</Nav.Link>
                                <Nav.Link href="#link">PUBLISH EVENT</Nav.Link>
                                <Nav.Link href="#link">DONATE</Nav.Link>
                            </Nav>
                            <Button>Login</Button>
                        </Navbar.Collapse>
                    </Navbar>
                </div>                
            </header>
        </React.Fragment>
    );
};

export default withRouter(Header);
