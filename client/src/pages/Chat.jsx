
import React, { useRef , useState} from 'react'
import AppLayout from '../components/layout/AppLayout'
import { IconButton, Stack } from '@mui/material'
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material'
import { InputBox } from '../components/styles/StyledComponents'
import FileMenu from '../components/dialogs/FileMenu'
import { sampleMessage } from '../components/constants/sampleData'
import MessageComponent from '../components/shared/MessageComponent'
import { grayColor } from '../components/constants/color'
import { getSocket } from '../socket'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { NEW_MESSAGE, START_TYPING } from '../components/constants/events'
import { useChatDetailsQuery, useGetMessagesQuery } from '../redux/api/api'

const Chat = ({ chatId, user }) => {

  const socket = getSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);


  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });

  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  // const user = {
  //   _id: 'skdnfowi',
  //   name: 'Mukul King of the World'
  // }
   const messageOnChange = (e) => {
    setMessage(e.target.value);

    if (!IamTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIamTyping(true);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIamTyping(false);
    }, [2000]);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    // Emitting the message to the server
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };



  // const fileMenuRef = useRef(null)
  return (
    <>
      <Stack ref={containerRef}
        boxSizing={'border-box'}
        padding={'1rem'}
        spacing={'1rem'}
        bgcolor={grayColor}
        height={'90%'}
        sx={{
          overflowX: 'hidden',
          overflowY: 'auto'
        }}
      >

        {
          sampleMessage?.map((i) => (
            <MessageComponent message={i} user={user} />
          ))
        }
      </Stack>

      <form
        style={{
          height: '10%'
        }}
          onSubmit={submitHandler}
      >
        <Stack
          direction={'row'}
          height={'100%'}
          padding={'1rem'}
          alignItems={'center'}
          position={'relative'}
        >
          <IconButton
            sx={{
              position: 'absolute',
              left: '1.5rem',
              rotate: '30deg'

            }}
          // ref={fileMenuRef}
          >
            <AttachFileIcon />
          </IconButton>
          <InputBox placeholder='type here' 
          value={message}
          onChange={messageOnChange}/>
          <IconButton type='submit'
            sx={{
              background: 'orange',
              color: 'white',
              marginLeft: '1rem',
              padding: '0.5rem',
              '&:hover': {
                bgcolor: 'error.dark'
              }
            }}>
            <SendIcon />
          </IconButton>
        </Stack>

      </form>
      <FileMenu />
    </>
  )
}

// export default AppLayout()(Chat)
export default AppLayout(Chat)
