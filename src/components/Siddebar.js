import React from "react";
import styled from "styled-components";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import SidebarChannels from "./SidebarChannels";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Siddebar() {
  const [channels, loading, error] = useCollection(db.collection("rooms"));
  const [user] = useAuthState(auth)
  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2>Let's talk</h2>
          <h3>
            <FiberManualRecordIcon />
            {user.displayName}
          </h3>
        </SidebarInfo>
        <CreateIcon />
      </SidebarHeader>
      <hr />
      <SidebarChannels Icon={ExpandMoreIcon} title={"Channels"} />
      <hr />
      <SidebarChannels Icon={AddIcon} title={"Add channel"} addChannelOption />

      {channels?.docs.map((channel) => (
        <SidebarChannels
          key={channel.id}
          id={channel.id}
          title={channel.data().name}
        />
      ))}
    </SidebarContainer>
  );
}

export default Siddebar;

const SidebarContainer = styled.div`
  background-color: #2155be;
  color: white;
  flex: 0.3;
  border-top: 1px solid #808080;
  max-width: 260px;
  margin-top: 60px;

  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #808080;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  /* border-bottom: 1px solid #808080; */
  padding: 13px;

  > .MuiSvgIcon-root {
    padding: 8px;
    color: #2155be;
    font-size: 18px;
    background-color: white;
    border-radius: 999px;
    cursor: pointer;

    :hover {
      opacity: 0.5;
    }
  }
`;

const SidebarInfo = styled.div`
  flex: 1;

  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5;
  }
  > h3 {
    display: flex;
    font-size: 15px;
    font-weight: 400;
    align-items: center;
  }

  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;
  }
`;
