import { memo } from 'react';
import { Avatar, IconButton, ListItem, Stack, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const UserItem = ({user, handler, handlerIsLoding}) => {

    const {name, _id, avatar} = user 

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
            >{name}</Typography>
            <IconButton 
            size='small'
            sx={{
                bgcolor:'primary.main',
                color : "white",
                "&:hover" : {
                    bgcolor : "primary.dark"
                },
            }}
            onClick={()=>handler(_id)} 
            disabled={handlerIsLoding}>
                <AddIcon/>
            </IconButton>   
        </Stack>
    </ListItem>
  )
}

export default memo(UserItem)