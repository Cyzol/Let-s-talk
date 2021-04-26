import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Chat from "./components/Chat";
import Header from "./components/Header";
import Siddebar from "./components/Siddebar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import LoginPage from "./components/LoginPage";
import ForumIcon from "@material-ui/icons/Forum";
import Spinner from "react-spinkit";

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <Container>
        <LoginContainer>
          <LoadingHeader>
            <Logo />
            <h2>Let's talk </h2>
          </LoadingHeader>
          <Spinner name="ball-spin-fade-loader" color="blue" fadeIn="none" />
        </LoginContainer>
      </Container>
    );
  }

  return (
    <Router>
      {user ? (
        <>
          <Header />
          <Body>
            <Siddebar />
            <Switch>
              <Route path="/">
                <Chat />
              </Route>
            </Switch>
          </Body>
        </>
      ) : (
        <LoginPage />
      )}
    </Router>
  );
}

export default App;

const Body = styled.div`
  display: flex;
  height: 100vh;
`;

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
`;

const LoadingHeader = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 70px;
`;
const Logo = styled(ForumIcon)`
  width: 80;
  height: 80;
  color: #2155be;
`;
