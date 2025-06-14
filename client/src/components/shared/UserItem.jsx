import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { Avatar, IconButton, ListItem, Stack, Typography } from '@mui/material';
import { memo } from 'react';
import { transforImage } from '../../lib/features';

const UserItem = ({
    user, 
    handler, 
    handlerIsLoding, 
    isAdded = false, 
    styling = {}
}) => {

    const {name, _id, avatar} = user 

  return (
    <ListItem>
        <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={'1rem'}
        width={"100%"}
        {...styling}
        >
            <Avatar src={transforImage(avatar)}/>
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
                bgcolor: isAdded ? 'error.main':'primary.main',
                color : "white",
                "&:hover" : {
                    bgcolor :  isAdded ? 'error.dark': "primary.dark"
                },
            }}
            onClick={()=>handler(_id)} 
            disabled={handlerIsLoding}>
                {
                    isAdded ? <RemoveIcon/>: <AddIcon/>
                }
                
            </IconButton>   
        </Stack>
    </ListItem>
  )
}

export default memo(UserItem)