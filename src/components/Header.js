import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import { AccessTime } from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/Search";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase/firebase";
import { useDispatch } from "react-redux";
import { enterRoom } from "../features/appSlice";

function Header() {
  const [user] = useAuthState(auth);
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [channels] = useCollection(db.collection("rooms"));
  const [searchChannels, setSearchChannels] = useState([]);
  const dispatch = useDispatch();

  const handleSignOut = () => auth.signOut();
  const handleSearchValue = (e) => setSearchValue(e.target.value);

  useEffect(() => {
    searchValue.length > 0 ? setIsOpen(true) : setIsOpen(false);
  }, [searchValue]);

  useEffect(() => {
    const filteredChannels = channels?.docs.filter(
      (channel) =>
        channel.data().name.toLowerCase().indexOf(searchValue.toLowerCase()) !==
        -1
    );
    setSearchChannels(filteredChannels);
  }, [isOpen, searchValue]);

  const handleSelectChannel = (id) => {
    if (id) {
      dispatch(
        enterRoom({
          roomId: id,
        })
      );
      setSearchValue("");
    }
  };

  return (
    <HeaderContainer>
      <HeaderLeft>
        <HeaderAvatar
          onClick={handleSignOut}
          src={user?.photoURL}
          alt={user.displayName}
        />
        <AccessTime />
      </HeaderLeft>
      <HeaderMiddle>
        <SearchIcon />
        <input
          placeholder="Search channels..."
          value={searchValue}
          onChange={handleSearchValue}
        />
        <SearchResults isVisible={isOpen && searchChannels.length !== 0}>
          {searchChannels?.map((channel) => (
            <SearchResultsItem
              key={channel.id}
              id={channel.id}
              onClick={() => handleSelectChannel(channel.id)}
            >
              {channel.data().name}
            </SearchResultsItem>
          ))}
        </SearchResults>
      </HeaderMiddle>

      <HeaderRight>
        <HelpOutlineIcon />
      </HeaderRight>
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: #2155be;
  color: white;
`;

const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-left: 20px;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
    cursor: pointer;

    :hover {
      opacity: 0.5;
    }
  }
`;

const HeaderMiddle = styled.div`
  flex: 0.4;
  opacity: 1;
  border-radius: 6px;
  text-align: center;
  display: flex;
  padding: 0 50px;
  color: gray;
  border: 1px gray solid;
  position: relative;

  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 30vw;
    outline: 0;
    color: white;
  }
`;

const SearchResults = styled.ul`
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
  z-index: 1000;
  max-height: 200px;
  overflow-y: scroll;
  padding: 10px;
  border-radius: 6px;
  list-style: none;
  width: 100%;
  position: absolute;
  left: 0;
  top: 30px;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const SearchResultsItem = styled.li`
  font-weight: bold;
  color: white;
  background-color: #2155be;

  width: 100%;
  padding: 20px 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  &:not(:last-child) {
    border-bottom: 1px solid white;
  }
`;

const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: flex-end;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 20px;
    cursor: pointer;

    :hover {
      opacity: 0.5;
    }
  }
`;

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.5;
  }
`;
