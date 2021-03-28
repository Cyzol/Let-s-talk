import React from "react";
import styled from "styled-components";
import ChatIcon from "@material-ui/icons/Chat";
import InfoIcon from "@material-ui/icons/Info";
import { useSelector } from "react-redux";
import { selectRoomId } from "./features/appSlice";
import ChatInput from "./ChatInput";
function Chat() {

  const roomId = useSelector(selectRoomId);
  return (
    <ChatContainer>
      <Header>
        <HeaderLeft>
          <h4>
            <strong># Room name</strong>
          </h4>
          <ChatIcon />
        </HeaderLeft>
        <HeaderRight>
          <p>
            <InfoIcon />
            Details
          </p>
        </HeaderRight>
      </Header>

      <ChatMessages>

      </ChatMessages>
      <ChatInput 
        channelId={roomId}
      />
    </ChatContainer>
  );
}

export default Chat;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow: scroll;
  margin-top: 60px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    display: flex;
    text-transform: lowercase;
    font-size: 18px;
    margin-right: 10px;
  }

  > h4 > .MuiSvgIcon-root {
    margin-left: 20px;
    font-size: 18px;
  }
`;
const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 20px;
  }
`;

const ChatMessages = styled.div``;
