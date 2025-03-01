import { Add as AddIcon, Delete as DeleteIcon, Done as DoneIcon, Edit as EditIcon, KeyboardBackspace as KeyboardBackspaceIcon, Menu as MenuIcon } from '@mui/icons-material'
import { Backdrop, Box, Button, ButtonGroup, Drawer, Grid2, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { matBlack } from '../components/constants/color'
import React, { memo, useEffect, useState, lazy, Suspense } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {Link} from '../components/styles/StyledComponents'
import AvatarCard from "../components/shared/AvatarCard";
import {sampleChats} from "../components/constants/sampleData"

const ConfirmDeleteDialog = lazy(() => import('../components/dialogs/ConfirmDeleteDialog'))
const AddMemberDialog = lazy(() => import('../components/dialogs/AddMemberDialog'))

const isAddMember = true;

const Groups = () => {

  const chatId = useSearchParams()[0].get('group');
  const navigate = useNavigate();

  console.log(chatId)

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [confirmDeleteDialog , setConfirmDeleteDialog] = useState('')

  const [groupName, setGroupName] = useState('')
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState('')

  const navigateBack = () =>{
    navigate('/')
  }

  const handleMobile = () =>{
    setIsMobileMenuOpen((prev) => !prev)
  }

  const handleMobileClose = () => setIsMobileMenuOpen(false)

  const updateGroupName = () => {
    setIsEdit(false)
    console.log(groupNameUpdatedValue)
  }

  const openConfirmDeleteHandler = () =>{
    setConfirmDeleteDialog(true)
    console.log("delete group");
  }
  const closeConfirmDeleteHandler = () =>{
    setConfirmDeleteDialog(false)
  }
  const openAddMemberHandler = () =>{
    console.log("add Member");
  }

  const deleteHandler = () =>{
    console.log("Delete Handler")
  }

useEffect(()=>{
  setGroupName("Group Name " + chatId)
  setGroupNameUpdatedValue('Group Name')

  return ()=>{
    setGroupName('')
    setGroupNameUpdatedValue("")
    setIsEdit(false)
  }
}, [])

  const IconBtns = <>
  <Box>
  <IconButton
  sx={{
    display : {
      xs : 'block',
      sm : 'none',
      position : 'fixed',
      right : "1rem",
      top : '1rem'
    }
  }}
  onClick={handleMobile}
  >
    <MenuIcon/>
  </IconButton>
  <Tooltip title ='back'>
    <IconButton sx={{
      position : 'absolute',
      top : '2rem',
      left : '2rem',
      bgcolor : matBlack,
      color : 'white',
      ":hover" : {
        bgcolor : 'rgba(0,0,0,0.5)'
      }
    }}
    onClick={navigateBack}
    >
      <KeyboardBackspaceIcon/>
    </IconButton>
  </Tooltip>
  </Box>
  </>
  const GroupName = <Stack 
  direction={'row'}
  alignItems={'center'}
  justifyContent={'center'}
  spacing={'1rem'}
  padding={'3rem'}
  >
    {
      isEdit ? (
      <>
      <TextField 
      value = {groupNameUpdatedValue}
      onChange = {(e)=> setGroupNameUpdatedValue(e.target.value)}/>
      <IconButton onClick={updateGroupName}><DoneIcon/></IconButton>
      </>
      ) : ( <>
      <Typography variant='h4'>{groupName}</Typography>
      <IconButton onClick = {() => setIsEdit(true)}><EditIcon/></IconButton>
      </>)   
    }
  </Stack>
  

  const ButtonGroup = (<Stack
  
  direction={{
    sm : "row",
    xs : "column-reverse"
   
  }}
  spacing={"1rem"}
  p={{
    xs : "0",
    sm : "1rem",
    md : "1rem 4rem"
  }}
  >
    <Button 
    size='large' 
    color='error' 
    startIcon={<DeleteIcon/>}
    onClick={openConfirmDeleteHandler}
    >Delete Group</Button>
    <Button 
    size = "large" 
    variant='contained' 
    startIcon={<AddIcon/>}
    onClick={openAddMemberHandler}
    >Add Member</Button>
  </Stack>)


  return <Grid2 container height={"100vh"}>
    <Grid2 
    item
    size={{ sm: 4 }}
    sx={{
      display : {
        xs : 'none',
        sm : 'block'
      }
    }}
    // sm={4}
    bgcolor={'bisque'}
    >
      <GroupList myGroups={sampleChats} chatId={chatId}/>
    </Grid2>
    <Grid2 item size={{ xs:12, sm:8 }} sx={{
      display : 'flex',
      flexDirection : 'column',
      alignItems  : "center",
      position : 'relative',
      padding : '1rem 3rem'
    }}>
      {IconBtns}
      {
         groupName && <>
         {GroupName}
         <Typography
         margin={"2rem"}
         alignSelf={"flex-start"}
         variant='body1'
         >Members
         </Typography>
         <Stack
         maxWidth={'45rem'}
         width={'100%'}
         boxSizing={'border-box'}
         padding={{
          sm : "1rem",
          xs : '0',
          md: "1rem 4rem"
         }}
         spacing={'2rem'}
         bgcolor={'bisque'}
         height={'50vh'}
         overflow={'auto'}
         >
          {/*  Members*/}
         </Stack>
         {ButtonGroup}
         </>
      }
    </Grid2>

    {
      isAddMember && (
        <Suspense fallback={<Backdrop open/>}>
          <AddMemberDialog/>
        </Suspense>
      )
    }

    {
      confirmDeleteDialog && (
        <Suspense fallback = {<Backdrop open/>}>
          <ConfirmDeleteDialog 
          open = {confirmDeleteDialog}
          handleClose = {closeConfirmDeleteHandler}
          deleteHandler={deleteHandler}
          />
        </Suspense>
      )
    }
    <Drawer 
    sx={{
      display : {
        xs : 'block',
        sm : 'none'
      }
    }}
    open = {isMobileMenuOpen} 
    onClose={handleMobileClose}
    >
      <GroupList w={'50vw'} myGroups={sampleChats} chatId={chatId}/>
    </Drawer>
  </Grid2>
}

const GroupList = ({w='100%', myGroups = [],chatId})=>(
  <Stack w={w}>
    {
      myGroups.length > 0 ? (
        myGroups.map((group) =><GroupListItem key={group._id} group={group} chatId={chatId}/>)
      ) : (
        <Typography variant="body1" color="initial" textAlign={'center'}>No group</Typography>
      )
    }
  </Stack>
)

const GroupListItem =memo(({group, chatId})=>{

  const {name, avatar, _id} = group;
  //  to={`?group=${_id}`} to access the id from url ? for queery
    return (
    <Link to={`?group=${_id}`} onClick={e =>
    {
      if(chatId === id) e.preventDefault();
    }
    }>    
    <Stack direction={'row'} spacing={'1rem'}>
      <AvatarCard avatar={avatar}/>
      <Typography>{name}</Typography>
    </Stack>
    </Link>
    )
})

export default Groups