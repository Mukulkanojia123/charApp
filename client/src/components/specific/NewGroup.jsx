import React, { useState } from 'react'
import { Avatar, Button, Dialog, DialogTitle, ListItem, Stack, TextField, Typography } from '@mui/material';
import {sampleUsers} from './../constants/sampleData'
import UserItem from '../shared/UserItem';
import { useInputValidation } from '6pp';

const NewGroup = () => {

  const groupName = useInputValidation("")

  const [members , setMembers]  = useState(sampleUsers)
  const [selectedMembers , setSelectedMembers]  = useState("")

const selectMemberhandler = (id) => {

  // setMembers(prev => 
  //   prev.map(user => 
  //     user._id === id ? {...user, isAdded : !user.isAdded}:user
  //   ))

  setSelectedMembers((prev) => (
    prev.includes(id) 
    ? prev.filter((i) => i !== id) 
    :[...prev,id]))
}
console.log(selectedMembers)

const submitHandler = () =>{

}

  return <Dialog open>
    <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"} spacing={'2rem'}>
      <DialogTitle textAlign={'center'} variant='h4'>New Group</DialogTitle>
      <TextField label='Group Name' value={groupName.value} onChange={groupName.changeHandler}/> 
      <Typography variant='body1'>Menbers</Typography>
      <Stack>
        {
          members.map((user) => (
            <UserItem user={user} key={user._id} handler={selectMemberhandler} isAdded = {selectedMembers.includes(user._id)}   />
          ))
        }
      </Stack>
      <Stack direction={'row'} justifyContent={'space-evenly'}>
        <Button variant='text' color='error'>Cancel</Button>
        <Button variant='contained' onClick={submitHandler}>Create</Button>
      </Stack>
    </Stack>
  </Dialog>
}

export default NewGroup