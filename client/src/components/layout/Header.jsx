import { AppBar, Box, Toolbar, Typography, IconButton, Tooltip, Backdrop } from '@mui/material'
import React, { lazy, Suspense, useState } from 'react'
import { orange } from '../constants/color'
import {Add as AddIcon ,Menu as MenuIcon , Search as SearchIcon, Group as GroupIcon, Logout as LogoutIcon, Notifications as NotificationsIcon} from "@mui/icons-material"
import {useNavigate} from 'react-router-dom'
// import SearchDialog from '../specific/Search'

  const SearchDialog = lazy(() => import('../specific/Search'))
  const Notifications = lazy(() => import('../specific/Notifications'))
  const NewGroupDialog = lazy(() => import('../specific/NewGroup'))

const Header = () => {

    const navigate = useNavigate();

    const [isMobile , setIsMobile] = useState();
    const [isSearch , setIsSearch] = useState();
    const [isNewGroup , setIsNewGroup] = useState();
    const [isNotification , setIsNotification] = useState();


  const handleMobile = () =>{
    setIsMobile(prev => !prev)
  }
  const openSearchDialog = () =>{
    setIsSearch(prev => !prev)
  }
  const openNewGraoup = () =>{
    setIsNewGroup(prev => !prev)
  }

  const openNotification = () =>{
    setIsNotification(prev => !prev)
  }
  const navigateToGroup = () =>{
    navigate('/group')
  }

  const logOutHandler = () =>{
    console.log('logOut')
  }

  return (
    <>
    <Box sx={{flexGrow : 1}} height={"4rem"}>
      <AppBar position='static' sx={{
        bgcolor:orange
      }} >
        <Toolbar>
          <Typography
          variant='h6'
          sx={{
            display : { xs:"none", sm:"block"}
          }}
          >
            CHATUU
          </Typography>
          <Box sx={{
            display : { xs:"block", sm:"none"}
          }}>
            <IconButton color="inherit" onClick={handleMobile}>
              <MenuIcon/>
            </IconButton>
          </Box>
          <Box sx={{
            flexGrow : 1
          }}/>
          <Box>
         
            <IconBtn
            title = "search"
            icon = {<SearchIcon/>}
            onClick={openSearchDialog}
            />
            <IconBtn
            title = "New Group"
            icon = {<AddIcon/>}
            onClick={openNewGraoup}
            />
            <IconBtn
            title = "Manage Group"
            icon = {<GroupIcon/>}
            onClick={navigateToGroup}
            />
            <IconBtn
            title = "Notification"
            icon = {<NotificationsIcon/>}
            onClick={openNotification}
            />
            <IconBtn
            title = "Logout"
            icon = {<LogoutIcon/>}
            onClick={logOutHandler}
            />
          </Box>
        </Toolbar>
      </AppBar>

    </Box>

    {
      isSearch && (
        <Suspense fallback={<Backdrop open/>}>
        <SearchDialog/>
        </Suspense>
        
      )
    }
    {
      isNewGroup && (
        <Suspense fallback={<Backdrop open/>}>
        <NewGroupDialog/>
        </Suspense>
        
      )
    }
    {
      isNotification && (
        <Suspense fallback={<Backdrop open/>}>
        <Notifications/>
        </Suspense>
        
      )
    }
    </>
  )
}

const IconBtn = ({title, icon, onClick}) =>{
  return (
    <Tooltip title={title}>
            <IconButton color='inherit' size='large' onClick={onClick}>
            {icon}
            </IconButton>
    </Tooltip>
  )
}

export default Header