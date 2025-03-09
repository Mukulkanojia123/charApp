import Grid from '@mui/material/Grid2';
import React, { useState } from 'react'
import { grayColor } from '../constants/color';
import { Box, Drawer, IconButton, Stack, } from '@mui/material';
import { Close as CloseIcon, Menu as MenuIcon } from '@mui/icons-material';

const Sidebar = (w = "100%")=>{
    return <Stack width={w}></Stack>
} 

const AdminLayout = ({children}) => {   // that is component that wrrap under admin layout
    
    const [isMobile, setIsMobile] = useState(false);

    const handleMobile = ()=> setIsMobile(!isMobile);
    const handleClose = () => setIsMobile(false)

  return (
    <Grid container minHeight={'100vh'}>
        <Box
        sx={{
            display : {xs : 'block', md : "none"},
            position : 'fixed',
            right : '1rem',
            top : '1rem'
        }}>
            <IconButton onClick={handleMobile}>
            {
                isMobile ? <CloseIcon/> :  <MenuIcon/>
            }
           
            </IconButton>
            
        </Box>
        <Grid
        item
        size={{ lg: 3, md: 4 }}
        sx={{
         display : {xs : 'none', md:'block'}   
        }}
        >
        <Sidebar/>
        </Grid>
        <Grid
        item
        size={{ xs :12 ,lg: 9, md: 8 }}
        sx={{
            bgcolor : grayColor   
        }}
        >
            {children}
        </Grid>
        <Drawer open={isMobile} onClose={handleClose}>
        <Sidebar w="50vw"/>
        </Drawer>
    </Grid>
  )
}

export default AdminLayout