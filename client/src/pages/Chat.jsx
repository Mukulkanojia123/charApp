
import React ,{useRef}from 'react'
import AppLayout from '../components/layout/AppLayout'
import { IconButton, Stack } from '@mui/material'
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material'
import { InputBox } from '../components/styles/StyledComponents'

const Chat = () => {

  const containerRef = useRef(null)
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

    </Stack>
    <form
    style={{
      height : '10%'
    }}
    >
      <Stack>
        <IconButton>
          <AttachFileIcon/>
        </IconButton>
        <InputBox/>
        <IconButton>
          <SendIcon/>
        </IconButton>
      </Stack>

    </form>
    </>
  )
}

// export default AppLayout()(Chat)
export default AppLayout(Chat)
