import React from 'react'
import { Link } from '../styles/StyledComponents'
import { Stack, Typography } from '@mui/material'

const ChatItem = ({avatar = [], name,_id, groupChat = false, sameSender, isOnline, newMessageAlert, index=0, handleDeleteOpenChat}) => {
  return (
    <Link to={`/chat/${_id}`}>
        <div style={{
            display : "flex",
            alignItems : 'center',
            gap : '1rem',
            padding : '1rem',
            background : sameSender ? 'black' : 'unset',
            // borderBottom : "1px solid #f0f0f0",
            color : sameSender ? 'white' : 'unset',
            // justifyContent : "space-between",
            position : 'relative'
        }}>
            <Stack>
                <Typography>{name}</Typography>
                {
                    newMessageAlert && (
                        <Typography>{newMessageAlert.count} New Message</Typography>
                    )
                }
            </Stack>

        </div>
    </Link>
  )
}

export default ChatItem