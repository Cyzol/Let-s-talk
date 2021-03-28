import React from "react";
import styled from "styled-components";
import { db } from "./firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { ContactlessOutlined } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { enterRoom } from "./features/appSlice";

function SidebarChannels({ Icon, title, addChannelOption, id }) {
  const dispatch = useDispatch();

  const addChannel = () => {
    const channelName = prompt("Please enter the channel name");

    if (channelName) {
      db.collection("rooms").add({
        name: channelName,
      });
    }
  };

  const selectChannel = () => {
    if (id) {
      dispatch(
        enterRoom({
          roomId: id,
        })
      );
    }
  };

  return (
    <SidebarChannelsContainer
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <SidebarOptionChannels>
          <span>#</span> {title}
        </SidebarOptionChannels>
      )}
    </SidebarChannelsContainer>
  );
}

export default SidebarChannels;

const SidebarChannelsContainer = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;

  :hover {
    opacity: 0.9;
    background-color: #1b59d6;
  }

  h3 > {
    font-weight: 500;
  }
  > h3 > span {
    padding: 15px;
  }
`;

const SidebarOptionChannels = styled.h3`
  padding: 10px 0;
  font-weight: 300;
`;
