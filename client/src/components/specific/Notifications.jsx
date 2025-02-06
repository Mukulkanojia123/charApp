import React, {memo} from 'react'
import { Dialog, DialogTitle, Stack, TextField, InputAdornment, List, ListItem, ListItemText, Typography, Avatar, Button } from '@mui/material';
import { sampleNotifications } from '../constants/sampleData';

const Notifications = () => {

  const friendRequestHandler = ({_id, accept}) =>{

  }

  return <Dialog open>
    <Stack p={{xs:"1rem", sm:"2rem"}} maxWidth={"25rem"}>
      <DialogTitle>Notifications</DialogTitle>
      {
        sampleNotifications.length > 0 ?
         (
         sampleNotifications.map((i) => <NotificationItem key = {i._id}sender={i.sender} _id={i._id} handler= {friendRequestHandler}/>)
         ): (
          <Typography textAlign={"center"}>
          No Notifications 
          </Typography>
          )
      }
    </Stack>
  </Dialog>
  
}

const NotificationItem = memo(({sender, _id, handler}) =>{
  return (
    <ListItem>
        <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={'1rem'}
        width={"100%"}
        >
            <Avatar/>
            <Typography
            variant='body1'
            sx={{
                flexGrow : 1,
                display : '-webkit-box',
                WebkitAlignClamp : 1,
                WebkitBoxOrient  : "vertical",
                overflow : 'hidden',
                textOverflow : "ellipsis",
                // background : 'red'
            }}
            >{`${sender} sent you a friend requuest`}
            </Typography>
            <Stack>
            <Button>Accept</Button>
            <Button>Reject</Button>  
            </Stack>   
        </Stack>
    </ListItem>
  )
})

export default Notifications