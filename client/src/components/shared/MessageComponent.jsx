import { Typography } from '@mui/material'
import { lightBlue } from '@mui/material/colors'
import React, {memo} from 'react'

const MessageComponent = ({message , user}) => {
    const {sender , content, attachments = [], createAt } = message
    const sameSender = sender?._id == user?._id
  return (
    <div
    style={{
        alignSelf : sameSender ? 'flex-end' : 'flex-start',
        background : 'white',
        color : 'black',
        borderRadius  : '5px',
        padding : '0.5rem',
        width : 'fit-content'
    }}  
    >
        {
            !sameSender && <Typography color={lightBlue} fontWeight={'600'} variant='caption'>{sender.name}</Typography>
        }
        {
            content && <Typography>{content}</Typography>
        }
    </div>
  )
}

export default memo(MessageComponent)