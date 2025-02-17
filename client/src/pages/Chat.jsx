
import React ,{useRef}from 'react'
import AppLayout from '../components/layout/AppLayout'
import { IconButton, Stack } from '@mui/material'
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material'
import { InputBox } from '../components/styles/StyledComponents'
import FileMenu from '../components/dialogs/FileMenu'
import { sampleMessage } from '../components/constants/sampleData'
import MessageComponent from '../components/shared/MessageComponent'

const Chat = () => {
  const user = {
    _id : 'skdnfowi',
    name : 'Mukul King of the World'
  }

  const containerRef = useRef(null);
  // const fileMenuRef = useRef(null)
  return (
    <>
    <Stack ref={containerRef}
    boxSizing={'border-box'}
    padding={'1rem'}
    spacing={'1rem'}
    height={'90%'}
    sx={{
      overflowX : 'hidden',
      overflowY : 'auto'
    }}
    >
      
    {
      sampleMessage?.map((i)=>(
        <MessageComponent message = {i} user = {user}/>
      ))
    }
    </Stack>

    <form
    style={{
      height : '10%'
    }}
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
          position : 'absolute',
           left : '1.5rem',
           rotate : '30deg' 

        }}
        // ref={fileMenuRef}
        >
          <AttachFileIcon/>
        </IconButton>
        <InputBox placeholder='type here'/>
        <IconButton type='submit'
        sx={{
          background : 'orange',
          color : 'white',
          marginLeft : '1rem',
          padding : '0.5rem',
          '&:hover' : {
            bgcolor : 'error.dark'
          }
        }}>
          <SendIcon/>
        </IconButton>
      </Stack>

    </form>
    <FileMenu />
    </>
  )
}

// export default AppLayout()(Chat)
export default AppLayout(Chat)
