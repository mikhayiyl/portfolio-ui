import Joi from "joi-browser";
import { toast } from "react-toastify";
import { Link, Navigate } from "react-router-dom";
import FormExtension from "./FormExtention";
import { Button, FormContainer, FormWrapper } from "./FormStyles";
import Advert from "./Advert";
import auth from "../../components/services/authService";

export default class Login extends FormExtension {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email Address"),
    password: Joi.string().required().min(6).label("Password"),
  };

  async doSubmit() {
    try {
      await auth.Login(this.state.data);
      toast.success("success");
      window.location = "/home";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = error.response.data;
        toast.error(errors.email);
        this.setState({ errors });
      }
    }
  }

  render() {
    if (this.props.user) return <Navigate to="/home" />;

    return (
      <FormContainer>
        <Advert />
        <FormWrapper onSubmit={this.handleSubmit} className="form">
          <h1>Login</h1>
          {this.renderInput(
            "email",
            "Email address",
            "We'll never share your email with anyone else"
          )}
          {this.renderInput(
            "password",
            "Password",
            " never share your password with anyone else",
            "password"
          )}
          {this.renderButton("Login")}
          <Link to="/password" className="link">Forgot Password</Link>
          <Link to="/register" className="link">
            <Button color="green">Create New Account</Button>
          </Link>
        </FormWrapper>
      </FormContainer>
    );
  }
}
