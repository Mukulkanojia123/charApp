import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Title from "../shared/Title";
import Grid from "@mui/material/Grid2";
import ChatList from "../specific/Chatlist";
import { sampleChats } from "../constants/sampleData"
import Profile from "../specific/Profile";
import { useMyChatsQuery } from "../../redux/api/api";
import { Drawer, Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setIsMobile } from "../../redux/reducers/misc"
import { useErrors, useSocketEvents } from "../../hooks/hook";
import { getSocket } from "../../socket";
import { setNewMessagesAlert } from "../../redux/reducers/chat";

const AppLayout = (WrappedComponent) => {
  return (props) => {
    const params = useParams()
    const dispatch = useDispatch()
    const chatId = params.chatId
    const socket = getSocket()

    const { isMobile } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery();

    useErrors([{ isError, error }]);

    useEffect(() => {

    }, [])

    const handleDeleteChat = (e, _id, groupChat) => {

    }

    const handleMobileClose = () => dispatch(setIsMobile(false));

    const newMessageAlertListener = useCallback(
      (data) => {
        if (data.chatId === chatId) return;
        dispatch(setNewMessagesAlert(data));
      },
      [chatId]
    );


    const eventHandlers = {
      [NEW_MESSAGE_ALERT]: newMessageAlertListener,
      [NEW_REQUEST]: newRequestListener,
      [REFETCH_CHATS]: refetchListener,
      [ONLINE_USERS]: onlineUsersListener,
    };

    useSocketEvents(socket, eventHandlers);

    return (
      <>

        <Title title="Chat App" />


        <Header />

        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobile} onClose={handleMobileClose}>
            <ChatList
              w="70vw"
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
              newMessagesAlert={newMessagesAlert}
              onlineUsers={onlineUsers}
            />
          </Drawer>
        )}

        <Grid container height={"calc(100vh - 4rem)"}>

          <Grid
            item
            size={{
              sm: 4,
              md: 3,
            }}
            sx={{
              display: { xs: "none", sm: "block" },
            }}
            height={"100%"}
          >
            {
              isLoading ? (
                <Skeleton />
              ) : (
                <ChatList chats={data?.chats} chatId={chatId}
                  handleDeleteChat={handleDeleteChat}
                />
              )
            }
          </Grid>


          <Grid
            item
            size={{
              xs: 12,
              sm: 8,
              md: 5,
              lg: 6,
            }}
            height={"100%"}
          // bgcolor="primary.main"
          >
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </Grid>


          <Grid
            item
            size={{
              md: 4,
              lg: 3,
            }}
            height={"100%"}
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
              bgcolor: "rgba(0,0,0,0.85)",
            }}
          >
            <Profile user={user} />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;