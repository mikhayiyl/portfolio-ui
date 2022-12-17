import { Email, Facebook, GitHub, LocationOn, PhoneAndroid, RateReview, StarBorder, Twitter } from "@material-ui/icons";
import React, { useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header";
import "./style.scss";
import { Rating, Stack } from '@mui/material'
import axios from "axios";
import { currentUser } from "../../components/services/authService";
import { useEffect } from "react";
import asyncErrors from "../../components/middleware/AsyncErrors";
import { toast } from "react-toastify";


const Support = ({ theme }) => {
    const [newValue, setNewValue] = useState(null);



    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const checkRate = asyncErrors(async () => {
            const { data } = await axios.put("/ratings/rate/" + currentUser()._id, { project: "Facebook-clone" }, { cancelToken: cancelToken.token })
            setNewValue(data.rate)
        });
        checkRate()

        return () => {
            cancelToken.cancel();

        }

    }, [])


    const handleSubmit = asyncErrors(async () => {
        const rate = newValue === null ? 0 : newValue;
        await axios.post("/ratings", { userId: currentUser()._id, rate, project: "Facebook-clone" })
        toast.info("rated");

    })

    return (
        <>
            <Header />
            <main id="contact" className={theme} >

                <div className="contact container" >
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
                        <div className="contact-item" id="ratings"
                        >
                            <RateReview className="gt icon" />
                            <div className="contact-info">
                                {newValue < 0.5 ? <h2>Rate this project</h2> : <h2>Thanks for rating</h2>}
                                {newValue > 0.5 && <small>you can always update rate</small>}
                                <Stack spacing={1}>
                                    <Rating
                                        name="half-rating"
                                        value={newValue}
                                        precision={0.5}
                                        onChange={(event, newValue) => { setNewValue(newValue) }}
                                        emptyIcon={<StarBorder style={{ color: "#000" }} />}
                                    />


                                </Stack>
                                <span className="badge bg-primary" onClick={handleSubmit}>submit</span>
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
