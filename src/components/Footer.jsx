import { Facebook, GitHub, Instagram, Twitter } from '@mui/icons-material';
import axios from 'axios';

import React, { useEffect, useState } from 'react'
import Async from "../middleware/AsyncErrors"
const Footer = () => {
    const [links, setLinks] = useState([]);
    let link = links[0];
    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const getData = Async(async () => {
            const { data } = await axios.get("/links", { cancelToken: cancelToken.token });
            setLinks(data);
        })

        getData();

        return () => {
            cancelToken.cancel();

        }
    }, []);


    if (!link) link = {};
    return (
        <footer>
            <div className="social-icons">
                <a target={"_blank"} rel="noreferrer" href={link.fbLink}>
                    <Facebook />
                </a>
                <a target={"_blank"} rel="noreferrer" href={link.twLink}>
                    <Twitter />
                </a>
                <a target={"_blank"} rel="noreferrer" href={link.instLink}>
                    <Instagram />
                </a>
                <a target={"_blank"} rel="noreferrer" href={link.gitLink}>
                    <GitHub />
                </a>
            </div>
            <span>Mikhayiyl &copy; copyright {new Date().getFullYear()} All Rights
                Reserved</span>
        </footer>
    )
}

export default Footer