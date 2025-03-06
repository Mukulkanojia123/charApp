import { Button, Dialog, DialogTitle, Typography, Stack } from '@mui/material'
import React, {useState} from 'react'
import {sampleUsers} from '../../components/constants/sampleData'
import UserItem from "../shared/UserItem"

const AddMemberDialog = ({addMember, isLoadingAddMember, chatId}) => {

    // const addFriendHandler = (id) =>{
    //     console.log(id)
    //     // addMember(id, chatId)
    // }

    

    const [members , setMembers]  = useState(sampleUsers)
    const [selectedMembers , setSelectedMembers]  = useState("")
    
    const selectMemberhandler = (id) => {
    
      setSelectedMembers((prev) => (
        prev.includes(id) 
        ? prev.filter((i) => i !== id) 
        :[...prev,id]))
    }

    const closeHandler = () =>{
        setSelectedMembers([])
        setMembers([])
    }

    const addMemberSubmitHandler = () =>{
        // addMember()
        closeHandler()
    }

  return <Dialog open>
    <Stack p={'2rem'} width={'20rem'} spacing={'2rem'}>
        <DialogTitle
        textAlign={'center'}
        >
        Add Member</DialogTitle>
        <Stack spacing={'1rem'}>
            {
               members.length > 0 ? members.map((i)=>(
                    <UserItem 
                    key={i._id} 
                    user={i} 
                    handler={selectMemberhandler}
                    isAdded={selectedMembers.includes(i._id)}
                    />
                )) : (
                <Typography
                textAlign={'center'}
                >
                No Member
                </Typography>)
            }
        </Stack>
        <Stack
        direction={'row'}
        alignItems={"center"}
        justifyContent={'space-evenly'}
        >
        <Button color='error'>Cancel</Button>
        <Button onClick={addMemberSubmitHandler} variant='contained' disabled = {isLoadingAddMember}>Submit Changes</Button>
        </Stack>
    </Stack>
  </Dialog>
}

export default AddMemberDialog