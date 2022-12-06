import styled from "styled-components";

export const FormContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  /* background-color: #55346878; */
  /* background-image: repeating-conic-gradient(
    from 45deg,
    #e70fb873 0deg 90deg,
    #2bece2a2 90deg 180deg
  ); */

  @media screen and (max-width: 720px) {
    flex-direction: column;
  
}
   
`;
export const FormWrapper = styled.form`
 width: 350px;
  border-radius: 20px;
  /* background-color: #ff440057; */
  padding: 0.7rem;
  color: #fff;
  background-image: repeating-conic-gradient(
    from 45deg,
    #00138082 0deg 90deg,
    #4c2c0784 90deg 180deg
  );
  
`;


export const SmallText = styled.small`
color: black;
font-weight: 300;
text-shadow: 0px 0px 5px #fff;
`


export const Button = styled.button`
display: block;
  width: 100%;
  padding: 8px 22px;
  background-color: ${(props) => props.color};
  color: #fff;
  border-radius: 10px;
  border: none;
  margin-top: 10px;

  &:disabled{
    opacity: 0.7;
  }
`

export const AdvertContainer = styled.div`
width: 350px;
height: auto;
display: flex;
align-items: center;
flex-direction: column;
text-align: center;

h6{
    color: blue;
    font-size: 2.5rem;
    font-weight: 600;
}

p{
    font-size: 1.3rem;
    font-weight:400;
}

`