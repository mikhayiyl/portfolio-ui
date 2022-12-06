import Joi from "joi-browser";
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header'
import styled from 'styled-components'
import FormExtension from "../Forms/FormExtention"
import { toast } from "react-toastify";
import { updateUser } from "../../components/services/userService";
import AppContext from "../../components/context/AppContext/AppContext";



const Container = styled.main`
width: 100%;
padding: 1rem;
`
const Title = styled.h2`
color: blue;

`

const AccountWrapper = styled.div`
background-image: linear-gradient(#444,yellow);
padding: 0.3rem;
`

const Form = styled.form`
max-width: 400px;
`


export default class Settings extends FormExtension {
    static contextType = AppContext
    currentuser = this.context.state.user;
    state = {
        data: { username: "", email: "", password: "", password2: "", city: "", from: "", relationship: "" },
        errors: {},
        options: [{ name: "Single", _id: 1 }, { name: "In a relationship", _id: 2 }, { name: "None", _id: 3 }]
    };


    componentDidMount() {
        this.setState({ data: this.mapToViewModel(this.currentuser) });

    }
    mapToViewModel(user) {
        return {
            _id: user._id,
            username: user.username,
            email: user.email,
            password: "",
            password2: "",
            city: user.city,
            from: user.from,
            relationship: user.relationship,
        };
    }

    schema = {
        _id: Joi.string(),
        username: Joi.string().required().min(5).label("Username"),
        email: Joi.string().required().min(5).email().label("Email"),
        password: Joi.string().required().min(6).label("Password"),
        password2: Joi.string().required().min(6).label("Password2"),
        city: Joi.string().required().min(5).label("City"),
        from: Joi.string().required().min(5).label("From"),
        relationship: Joi.number().required().label("Relationship"),
    };

    async doSubmit() {
        await updateUser(this.state.data);
        toast.info("success");
        window.location = '/'
    }



    render() {

        return (
            <section>
                <Header />
                <Container>

                    <Form onSubmit={this.handleSubmit} className="form">
                        <AccountWrapper>
                            <Title>Account Details</Title>
                            {this.renderInput(
                                "username",
                                "Username",
                                "We'll never share your name with anyone else",

                            )}

                            {this.renderInput(
                                "email",
                                "Email address",
                                "We'll never share your email with anyone else",

                            )}
                            {this.renderInput(
                                "password",
                                "Password",
                                " never share your password with anyone else",
                                "password",

                            )}
                            {this.renderInput(
                                "password2",
                                "Confirm Password",
                                " never share your password with anyone else",
                                "password",
                            )}
                        </AccountWrapper>
                        <div>


                            <Title>Personal Details</Title>
                            {this.renderInput(
                                "city",
                                "City",
                                "We'll never share your residence with anyone else",

                            )}

                            {this.renderInput(
                                "from",
                                "From",
                                "We'll never share your location with anyone else",

                            )}

                            {this.renderSelect("relationship", "Relationship", this.state.options)}
                        </div>
                        {this.renderButton('save & submit', "crimson")}
                    </Form>
                </Container>
                <Footer />
            </section>
        )
    }
}
