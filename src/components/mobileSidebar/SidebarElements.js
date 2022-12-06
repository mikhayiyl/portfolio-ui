import styled from "styled-components";
export const SidebarContainer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(rgba(0,0,0,0.7),rgba(0, 0, 255, 0.8878));
  display: flex;
  justify-content:center;
  align-items: center;
  transition: 0.59s ease-in-out;
  opacity: ${({ toggleMenu }) => (toggleMenu ? "100%" : "0.5")};
  top: ${({ toggleMenu }) => (toggleMenu ? "0" : "-100%")};
`;

export const SidebarWrapper = styled.ul`
width: 100%;
height: 100%;
display: grid;
align-items: center;
transition: all 0.5s ease-in-out;
transform: ${props => props.isOpen ? "translateY(0)" : "translateY(-100%)"};

`;

export const SidebarMenu = styled.li`
list-style: none;
transition: all 0.3s ease-in-out;
transform: ${props => props.isOpen ? "translateX(0)" : "translateX(100vw)"};


&:nth-child(1) {
    transition-delay: 0.25s;
  }

  &:nth-child(2) {
    transition-delay: 0.35s;
  }

  &:nth-child(3) {
    transition-delay: 0.45s;
  }

  &:nth-child(4) {
    transition-delay: 0.55s;
  }
  &:nth-child(5) {
    transition-delay: 0.65s;
  }
  &:nth-child(6) {
    transition-delay: 0.75s;
  }
  &:nth-child(7) {
    transition-delay: 0.85s;
  }


`;


