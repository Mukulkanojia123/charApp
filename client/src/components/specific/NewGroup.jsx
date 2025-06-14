import { useInputValidation } from '6pp';
import { Button, Dialog, DialogTitle, Skeleton, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import UserItem from '../shared/UserItem';
import { sampleUsers } from './../constants/sampleData';
import { useAsyncMutation, useErrors } from '../../hooks/hook';
import { useDispatch, useSelector } from 'react-redux';
import { useAvailableFriendsQuery } from '../../redux/api/api';
import {setIsNewGroup} from "../../redux/reducers/misc"

const NewGroup = () => {

   const { isNewGroup } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  const { isError, isLoading, error, data } = useAvailableFriendsQuery();
  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);

  const groupName = useInputValidation("")

  const [members , setMembers]  = useState(sampleUsers)
  const [selectedMembers , setSelectedMembers]  = useState("")

  const errors = [
    {
      isError,
      error,
    },
  ];

  useErrors(errors);

const selectMemberHandler = (id) => {

  setSelectedMembers((prev) => (
    prev.includes(id) 
    ? prev.filter((i) => i !== id) 
    :[...prev,id]))
}


const submitHandler = () => {
    if (!groupName.value) return toast.error("Group name is required");

    if (selectedMembers.length < 2)
      return toast.error("Please Select Atleast 3 Members");

    newGroup("Creating New Group...", {
      name: groupName.value,
      members: selectedMembers,
    });

    closeHandler();
  };

  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };

  return <Dialog open>
    <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"} spacing={'2rem'}>
      <DialogTitle textAlign={'center'} variant='h4'>New Group</DialogTitle>
      <TextField label='Group Name' value={groupName.value} onChange={groupName.changeHandler}/> 
      <Typography variant='body1'>Menbers</Typography>
      <Stack>
        {isLoading ? (
            <Skeleton />
          ) : (
            data?.friends?.map((i) => (
              <UserItem
                user={i}
                key={i._id}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          )}
      </Stack>
      <Stack direction={'row'} justifyContent={'space-evenly'}>
        <Button variant='text' color='error'onClick={closeHandler}>Cancel</Button>
        <Button variant='contained' onClick={submitHandler}>Create</Button>
      </Stack>
    </Stack>
  </Dialog>
}

export default NewGroup