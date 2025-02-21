import { Typography, Box } from '@mui/material'
import { lightBlue } from '@mui/material/colors'
import React, {memo} from 'react'
import moment from 'moment'
import { fileFormat } from '../../lib/features'
import RenderAttachment from './RenderAttachment'

const MessageComponent = ({message , user}) => {
    const {sender , content, attachments = [], createAt } = message
    const sameSender = sender?._id == user?._id

    const timeago = moment(createAt).fromNow()
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

        {
            attachments.length > 0 && attachments.map((attachment, index) =>{
                const url = attachment.url;
                const file = fileFormat(url)
                // console.log(url)

                return <Box key={index}>
                    <a
                    href={url}
                    target='_blank'
                    download
                    style={{
                        color : 'black'
                    }}
                    >
                    {RenderAttachment(file , url)}
                    </a>
                </Box>
            })
        }
        <Typography variant='caption' color={"text.secondary"}>{timeago}</Typography>
    </div>
  )
}

export default memo(MessageComponent)