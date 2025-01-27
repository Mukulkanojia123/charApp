import { AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material'
import React from 'react'
import { orange } from '../constants/color'
import {Menu as MenuIcon , Search as SearchIcon} from "@mui/icons-material"

const Header = () => {

  const handleMobile = () =>{
    console.log('Mobile')
  }
  const openSearchDialog = () =>{
    console.log('search')
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
          <IconButton color="inherit" size="large" onClick={openSearchDialog}>
              <SearchIcon/>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

    </Box>
    </>
  )
}

export default Header