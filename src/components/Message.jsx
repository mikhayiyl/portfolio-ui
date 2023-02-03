import { CancelOutlined, Email, MessageOutlined, VerifiedUserOutlined } from '@mui/icons-material'
import { motion } from "framer-motion"
import React, { Component } from 'react'
import axios from "axios";

export default class Message extends Component {

    state = {
        data: { username: "", email: "", text: "" },
    };




    handleChange = ({ currentTarget: input }) => {
        const data = { ...this.state.data };
        data[input.name] = input.value;

        this.setState({ data });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, text } = this.state.data;
        await axios.post("/messages", {
            username: username,
            email: email,
            text: text,
        })

    }


    dropIn = {

        hidden: {
            y: "-100vh",
            opacity: 0,
        },

        visible: {
            y: "0",
            opacity: 1,
            transition: {
                duration: 0.2,
                type: "spring",
                damping: 15,
                stiffness: 500
            }
        },

        exit: {
            y: "100vh",
            opacity: 0,
        }
    }





    render() {
        const { data } = this.state
        return (
            <motion.div
                variants={this.dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
                className='messageBackdrop'
            >
                <form onSubmit={this.handleSubmit}
                >
                    <CancelOutlined className='cancel'
                        onClick={() => this.props.setModalOpen(false)}
                    />
                    <h2>send text</h2>
                    <div className="inputBox">
                        <input type="text" required
                            name="username"
                            value={data.username}
                            onChange={this.handleChange}

                        />
                        <VerifiedUserOutlined className="icon" />
                        <span className="label">username</span>
                    </div>

                    <div className="inputBox">
                        <input type="text" required
                            name="email"
                            value={data.email}
                            onChange={this.handleChange}

                        />
                        <Email className="icon" />
                        <span className="label">Email Adress</span>
                    </div>
                    <div className="inputBox">
                        <textarea type="text" required
                            name="text"
                            value={data.text}
                            onChange={this.handleChange}

                        />
                        <MessageOutlined className="icon" />
                        <span className="label">Message</span>
                    </div>

                    <div className="inputBox">
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </motion.div>

        )
    }
}