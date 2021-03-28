import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Chat from "./Chat";
import Header from "./Header";
import Siddebar from "./Siddebar";

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;

const Body = styled.div`
  display: flex;
  height: 100vh;
`;
