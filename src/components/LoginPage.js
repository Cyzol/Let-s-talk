import React from "react";
import styled from "styled-components";
import ForumIcon from "@material-ui/icons/Forum";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase/firebase";
function LoginPage() {
  const handleSignIn = (e) => {
    e.preventDefault();
    auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };

  return (
    <Container>
      <LoginContainer>
        <Header>
          <Logo />
          <h2>Let's talk </h2>
        </Header>
        <h4>Sign in to chat with your friends !</h4>
        <Button type="submit" onClick={handleSignIn}>
          Sign in with Google
        </Button>
      </LoginContainer>
    </Container>
  );
}

export default LoginPage;

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
  height: 400px;
  width: 300px;
  box-sizing: border-box;
  box-shadow: -2px 4px 10px rgba(115, 124, 142, 0.5);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > button {
    box-sizing: border-box;
    background-color: transparent;
    border-radius: 0.6em;
    cursor: pointer;
    display: flex;
    align-self: center;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1;
    margin: 60px 20px 0px;
    padding: 1.2em 2.8em;
    text-align: center;
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    color: #fff;
    box-shadow: 0 0 40px 40px #0a8d48 inset, 0 0 0 0 #0a8d48;
    transition: all 200ms ease-in-out;

    &:hover {
      box-shadow: 0 0 10px 0 #0a8d48 inset, 0 0 10px 4px #0a8d48;
      color: black;
    }
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin: 20px;
`;
const Logo = styled(ForumIcon)`
  width: 80;
  height: 80;
  color: #2155be;
`;
