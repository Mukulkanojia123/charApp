import { Avatar, Button, Dialog, DialogTitle, ListItem, Stack, Typography, Skeleton } from '@mui/material';
import React, { memo } from 'react';
import { sampleNotifications } from '../constants/sampleData';
import {useAcceptFriendRequestMutation, useGetNotificationsQuery} from "../../redux/api/api"
import { useDispatch , useSelector } from 'react-redux';
import {useAsyncMutation} from "../../hooks/hook"
import {setIsNotification} from "../../redux/reducers/misc"

const Notifications = () => {

  const { isNotification } = useSelector((state) => state.misc);


  const dispatch = useDispatch()

  const { isLoading, data, error, isError } = useGetNotificationsQuery();
   const [acceptRequest] = useAsyncMutation(useAcceptFriendRequestMutation);


  const friendRequestHandler = async ({_id, accept}) =>{
    dispatch(setIsNotification(false));
    await acceptRequest("Accepting...", { requestId: _id, accept });
  }

   const closeHandler = () => dispatch(setIsNotification(false));


  return <Dialog open={isNotification} onClose={closeHandler} >
    <Stack p={{xs:"1rem", sm:"2rem"}} maxWidth={"25rem"}>
      <DialogTitle>Notifications</DialogTitle>
       {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {data?.allRequests.length > 0 ? (
              data?.allRequests?.map(({ sender, _id }) => (
                <NotificationItem
                  sender={sender}
                  _id={_id}
                  handler={friendRequestHandler}
                  key={_id}
                />
              ))
            ) : (
              <Typography textAlign={"center"}>0 notifications</Typography>
            )}
          </>
        )}
    </Stack>
  </Dialog>
  
}

const NotificationItem = memo(({sender, _id, handler}) =>{
  const {name , avatar} = sender
  return (
    <ListItem>
        <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={'1rem'}
        width={"100%"}
        >
            <Avatar src={avatar}/>
            <Typography
            variant='body1'
            sx={{
              flexGrow: 1,
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1, 
              overflow: "hidden",
              textOverflow: "ellipsis",
                // background : 'red'
            }}
            >{`${name} send a request `}
            </Typography>
            <Stack direction={{
              xs : "column",
              sm : "row"
            }}>
            <Button onClick={()=> handler({_id, accept: true, })}>Accept</Button>
            <Button color='error' onClick={()=> handler({_id, accept: false, })}>Reject</Button>  
            </Stack>   
        </Stack>
    </ListItem>
  )
})

export default Notifications