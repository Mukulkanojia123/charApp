import { Button, Dialog, DialogTitle, Typography } from '@mui/material'
import React from 'react'
import {sampleUsers} from '../../components/constants/sampleData'
import UserItem from "../shared/UserItem"

const AddMemberDialog = ({addMember, isLoadingAddMember, chatId}) => {

    const addFriendHandler = (id) =>{
        console.log(id)
        // addMember(id, chatId)
    }

  return <Dialog open>
    <Stack p={'2rem'} width={'20rem'} spacing={'2rem'}>
        <DialogTitle
        textAlign={'center'}
        >
        Add Member</DialogTitle>
        <Stack spacing={'1rem'}>
            {
               sampleUsers.length > 0 ? sampleUsers.map((i)=>(
                    <UserItem key={i.id} user={i} handler={addFriendHandler}/>
                )) : (
                <Typography
                textAlign={'center'}
                >
                No Member
                </Typography>)
            }
        </Stack>
        <Stack>
        <Button color='error'>Cancel</Button>
        <Button variant='contained' disabled = {isLoadingAddMember}>Submit Changes</Button>
        </Stack>
    </Stack>
  </Dialog>
}

export default AddMemberDialog