import { SmallText } from "./FormStyles";

const FormInput = ({ name, label, error, sometext, value, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input type="text" name={name} id={name} value={value} {...rest} className="form-control" />
      <SmallText id={name} >
        {sometext}
      </SmallText>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default FormInput;
