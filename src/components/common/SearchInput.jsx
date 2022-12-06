import styled from "styled-components";
import { mobile } from "../../ResponsiveDesigns";
const Container = styled.div`
flex:28%;
display: flex;
${mobile({ display: "none" })}
`

const Input = styled.input`
  border: ${props => props.theme === "light" ? "1px solid #000" : "none"};;
  box-shadow: none;
  /* border:1px solid #000; */
  width: 100%;
 margin-left: 2rem;
 font-weight: 500;
 
 ${mobile({ fontSize: "0.7rem", marginLeft: "2.7rem" })}
 
 `


const SearchInput = ({ setText, theme }) => {



  return (
    <Container >
      <Input
        className="form-control"
        onChange={(e) => setText(e.currentTarget.value.trim())}
        placeholder={`search friends or posts`}
        theme={theme}
      />

    </Container>
  );
};

export default SearchInput;
