import { Email, Facebook, GitHub, LocationOn, PhoneAndroid, Twitter } from "@material-ui/icons";
import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header";
import "./style.scss";

const Support = ({ theme }) => {

    return (
        <>
            <Header />
            <main id="contact" className={theme}>

                <div className="contact container">
                    <div>
                        <h1 className="section-title">
                            Contact <span>Info</span>
                        </h1>
                    </div>

                    <div className="contact-items">

                        <div className="contact-item">
                            <PhoneAndroid className="phone icon" />
                            <div className="contact-info">
                                <h2>Phone</h2>
                                <h3>+254 742 769200</h3>
                            </div>
                        </div>
                        <div className="contact-item">
                            <Email className="email icon" />
                            <div className="contact-info">
                                <h2>Email</h2>
                                <h3>duhnycan@gmail.com</h3>
                            </div>
                        </div>
                        <div className="contact-item">
                            <LocationOn className="location icon" />
                            <div className="contact-info">
                                <h2>Address</h2>
                                <h3>Po.Box.1215-90100</h3>
                            </div>
                        </div>
                        <div className="contact-item">
                            <Facebook className="fb icon" />
                            <div className="contact-info">
                                <h2>Facebook</h2>
                                <h3>Star Michael Devine</h3>
                            </div>
                        </div>
                        <div className="contact-item">
                            <Twitter className="tw icon" />
                            <div className="contact-info">
                                <h2>Twitter</h2>
                                <h3>SPACE MIKHAYIYL</h3>
                            </div>
                        </div>
                        <div className="contact-item">
                            <GitHub className="gt icon" />
                            <div className="contact-info">
                                <h2>Github</h2>
                                <h3>MIKHAYIYL</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Support;
