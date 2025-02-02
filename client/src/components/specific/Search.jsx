import React , {useState}from 'react';
import { Dialog, DialogTitle, Stack, TextField, InputAdornment, List, ListItem, ListItemText } from '@mui/material';
import { useInputValidation } from "6pp";
import { Search as SearchIcon } from '@mui/icons-material';
import UserItem from '../shared/UserItem';

// const users = [1,2,3,4,5]

const Search = () => {
  const search = useInputValidation("");
  const addFriendHandler = (id) =>{
    console.log(id)
  }

  let isLoadingSendFriend = false;

  const [users, setUsers] = useState([1,2,3,4,5])


  return (
    <Dialog open>
      <Stack p={'2rem'} direction={'column'} width={'25rem'}>
        <DialogTitle textAlign={'center'}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant='outlined'
          size='small'
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon/>
                </InputAdornment>
              )
            }
          }}
        />
        <List>
          {
            users.map((user) =>(
              <UserItem user={user} key={user._id} handler={addFriendHandler} handlerIsLoading={isLoadingSendFriend}/>
            ))
          }
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
