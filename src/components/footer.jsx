import React, { useState } from "react";
import { withRouter, Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Form ,Button} from "react-bootstrap";
import footerLogo from '../assets/images/footer-logo.svg';
import footervector from '../assets/images/footer-vector.svg';
import footervector2 from '../assets/images/footer-vector-2.svg';


const Header = () => {

    return (
        <React.Fragment>
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="footer-logo">
                                <img src={footerLogo} alt="greenyfi" title="greenyfi" />
                            </div>
                            <div className="contact-details">
                                <Link to="#" className="mobile-number">974-619-6752</Link>
                                <Link to="#" className="email">meda.swaniawski@naomie.co.uk</Link>
                                <div className="social-media">
                                    <Link className="fa fa-facebook" aria-hidden="true"></Link>
                                    <Link className="fa fa-twitter" aria-hidden="true"></Link>
                                    <Link className="fa fa-linkedin" aria-hidden="true"></Link>
                                    <Link className="fa fa-youtube-play" aria-hidden="true"></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="row">
                                 <div className="col-md-4">
                                    <div className="footer-link">
                                        <h3>Company</h3>
                                        <Link to="#">About us</Link>
                                        <Link to="#">Contact us</Link>
                                        <Link to="#">Join us</Link>
                                        <Link to="#">Sitemap</Link>
                                    </div>
                                 </div>
                                 <div className="col-md-4">
                                    <div className="footer-link">
                                        <h3>Browse</h3>
                                        <Link to="#">Report</Link>
                                        <Link to="#">Publish event</Link>
                                        <Link to="#">Donate</Link>
                                        <Link to="#">All Events</Link>
                                    </div>
                                 </div>
                                 <div className="col-md-4">
                                    <div className="footer-link with-copyright">
                                        <h3>Legal</h3>
                                        <Link to="#">Privacy Policy</Link>
                                        <Link to="#">Website Terms of Use</Link>
                                        <p>© 2020, GREENY5</p>
                                    </div>
                                 </div>
                            </div>
                        </div>
                    </div>
                </div>   
                <img src={footervector} alt="greenyfi" title="greenyfi" className="footer-vector"/>
                <img src={footervector2} alt="greenyfi" title="greenyfi" className="footer-vector2"/>         
            </footer>
        </React.Fragment>
    );
};

export default withRouter(Header);
