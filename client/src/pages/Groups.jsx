import { Add as AddIcon, Delete as DeleteIcon, Done as DoneIcon, Edit as EditIcon, KeyboardBackspace as KeyboardBackspaceIcon, Menu as MenuIcon } from '@mui/icons-material'
import { Backdrop, Box, Button, CircularProgress, Drawer, Grid2, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { lazy, memo, Suspense, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { bgGradient, matBlack } from '../components/constants/color'
import { LayoutLoader } from "../components/layout/Loaders"
import AvatarCard from "../components/shared/AvatarCard"
import UserItem from '../components/shared/UserItem'
import { Link } from '../components/styles/StyledComponents'
import { useAsyncMutation, useErrors } from '../hooks/hook'
import { useChatDetailsQuery } from '../redux/api/api'
import { setIsAddMember } from '../redux/reducers/misc'

const ConfirmDeleteDialog = lazy(() => import('../components/dialogs/ConfirmDeleteDialog'))
const AddMemberDialog = lazy(() => import('../components/dialogs/AddMemberDialog'))

// const isAddMember = false;

const Groups = () => {

  const chatId = useSearchParams()[0].get('group');
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { isAddMember } = useSelector((state) => state.misc);

  const myGroups = useMyGroupsQuery("");

  const groupDetails = useChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  );

  const [updateGroup, isLoadingGroupName] = useAsyncMutation(
    useRenameGroupMutation
  );

  const [removeMember, isLoadingRemoveMember] = useAsyncMutation(
    useRemoveGroupMemberMutation
  );

  const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(
    useDeleteChatMutation
  );

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState('')

  const [groupName, setGroupName] = useState('')
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState('')
   const [members, setMembers] = useState([]);

  const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },
    {
      isError: groupDetails.isError,
      error: groupDetails.error,
    },
  ];

  useErrors(errors);

  useEffect(() => {
    const groupData = groupDetails.data;
    if (groupData) {
      setGroupName(groupData.chat.name);
      setGroupNameUpdatedValue(groupData.chat.name);
      setMembers(groupData.chat.members);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setMembers([]);
      setIsEdit(false);
    };
  }, [groupDetails.data]);

  const navigateBack = () => {
    navigate('/')
  }

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  const handleMobileClose = () => setIsMobileMenuOpen(false)

  const updateGroupName = () => {
    setIsEdit(false)
     updateGroup("Updating Group Name...", {
      chatId,
      name: groupNameUpdatedValue,
    });
  }

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true)
    console.log("delete group");
  }
  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false)
  }
  const openAddMemberHandler = () => {
     dispatch(setIsAddMember(true));
  }

  const deleteHandler = () => {
    deleteGroup("Deleting Group...", chatId);
    closeConfirmDeleteHandler();
    navigate("/groups");
  }

  const removeMemberHandler = (userId) => {
    removeMember("Removing Member...", { chatId, userId });

  }

 useEffect(() => {
    if (chatId) {
      setGroupName(`Group Name ${chatId}`);
      setGroupNameUpdatedValue(`Group Name ${chatId}`);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    };
  }, [chatId]);

  const IconBtns = <>
    <Box>
      <IconButton
        sx={{
          display: {
            xs: 'block',
            sm: 'none',
            position: 'fixed',
            right: "1rem",
            top: '1rem'
          }
        }}
        onClick={handleMobile}
      >
        <MenuIcon />
      </IconButton>
      <Tooltip title='back'>
        <IconButton sx={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          bgcolor: matBlack,
          color: 'white',
          ":hover": {
            bgcolor: 'rgba(0,0,0,0.5)'
          }
        }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
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
            value={groupNameUpdatedValue}
            onChange={(e) => setGroupNameUpdatedValue(e.target.value)} />
          <IconButton onClick={updateGroupName} disabled={isLoadingGroupName}><DoneIcon /></IconButton>
        </>
      ) : (<>
        <Typography variant='h4'>{groupName}</Typography>
        <IconButton onClick={() => setIsEdit(true)} disabled={isLoadingGroupName}><EditIcon /></IconButton>
      </>)
    }
  </Stack>


  const ButtonGroup = (<Stack

    direction={{
      sm: "row",
      xs: "column-reverse"

    }}
    spacing={"1rem"}
    p={{
      xs: "0",
      sm: "1rem",
      md: "1rem 4rem"
    }}
  >
    <Button
      size='large'
      color='error'
      startIcon={<DeleteIcon />}
      onClick={openConfirmDeleteHandler}
    >Delete Group</Button>
    <Button
      size="large"
      variant='contained'
      startIcon={<AddIcon />}
      onClick={openAddMemberHandler}
    >Add Member</Button>
  </Stack>)


  return myGroups.isLoading ? (
    <LayoutLoader />
  ) : (
    <Grid2 container height={"100vh"}>
      <Grid2
        item
        size={{ sm: 4 }}
        sx={{
          display: {
            xs: 'none',
            sm: 'block'
          },
          backgroundImage: bgGradient
        }}
        // sm={4}
        bgcolor={'bisque'}
      >
        <GroupList myGroups={myGroups?.data?.groups} chatId={chatId} />
      </Grid2>
      <Grid2 item size={{ xs: 12, sm: 8 }} sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        position: 'relative',
        padding: '1rem 3rem'
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
                sm: "1rem",
                xs: '0',
                md: "1rem 4rem"
              }}
              spacing={'2rem'}
              bgcolor={'bisque'}
              height={'50vh'}
              overflow={'auto'}
            >
              {/*  Members*/}
              { isLoadingRemoveMember ? (
                <CircularProgress />
              ) : (members.map((i) => (
                  <UserItem user={i}
                    isAdded
                    styling={{
                      boxShadow: '0, 0, 0.5rem rgba(0,0,0, 0.2)',
                      padding: '1rem 2rem',
                      borderRadius: '1rem'
                    }}
                    handler={removeMemberHandler}
                  />
                ))
              )}
            </Stack>
            {ButtonGroup}
          </>
        }
      </Grid2>

      {
        isAddMember && (
          <Suspense fallback={<Backdrop open />}>
            <AddMemberDialog />
          </Suspense>
        )
      }

      {
        confirmDeleteDialog && (
          <Suspense fallback={<Backdrop open />}>
            <ConfirmDeleteDialog
              open={confirmDeleteDialog}
              handleClose={closeConfirmDeleteHandler}
              deleteHandler={deleteHandler}
            />
          </Suspense>
        )
      }
      <Drawer
        sx={{
          display: {
            xs: 'block',
            sm: 'none'
          },
          backgroundImage: bgGradient
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
      >
        <GroupList w={'50vw'} myGroups={myGroups?.data?.groups} chatId={chatId} />
      </Drawer>
    </Grid2>
  )
}

const GroupList = ({ w = '100%', myGroups = [], chatId }) => (
  <Stack w={w}
    sx={{
      backgroundImage: bgGradient,
      height: '100vh'
    }}
  >
    {
      myGroups.length > 0 ? (
        myGroups.map((group) => <GroupListItem key={group._id} group={group} chatId={chatId} />)
      ) : (
        <Typography variant="body1" color="initial" textAlign={'center'}>No group</Typography>
      )
    }
  </Stack>
)

const GroupListItem = memo(({ group, chatId }) => {

  const { name, avatar, _id } = group;
  //  to={`?group=${_id}`} to access the id from url ? for queery
  return (
    <Link to={`?group=${_id}`} onClick={e => {
      if (chatId === id) e.preventDefault();
    }
    }>
      <Stack direction={'row'} spacing={'1rem'}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  )
})

export default Groups