import Grid from '@mui/material/Grid2';
import React, { useState } from 'react'
import { grayColor, matBlack } from '../constants/color';
import { Box, Drawer, IconButton, Stack, styled, Typography, } from '@mui/material';
import { Close as CloseIcon, Dashboard as DashboardIcon, ExitToApp as ExitToAppIcon, Groups as GroupIcon, ManageAccounts as ManageAccountsIcon, Menu as MenuIcon, Message as MessageIcon} from '@mui/icons-material';
import { useLocation, Link as LinkComponent} from 'react-router-dom';
// import { adminTabs } from '../constants/route';
// import { Link } from '../styles/StyledComponents';


const Link = styled(LinkComponent)`
 text-decoration : none;
 border-radius : 2rem;
 padding : 1rem 2rem;
 color : black;
 & : hover {
 color : rgba(0,0,0,0.54);
 }

`


const adminTabs = [
    {
    name : "Dashboard",
    path : "/admin/dashboard",
    icon : <DashboardIcon/>
},
    {
    name : "Users",
    path : "/admin/users-management",
    icon : <ManageAccountsIcon/>
},
    {
    name : "Chat",
    path : "/admin/chats-management",
    icon : <GroupIcon/>
},
    {
    name : "messages",
    path : "/admin/messages",
    icon : <MessageIcon/>
},
]
const Sidebar = (w = "100%")=>{

    const location = useLocation();

    const logoutHandler = () =>{
        console.log('logout')
    }

    return (
    <Stack 
    width={w} 
    direction={'column'} 
    p={'3rem'} 
    spacing={'3rem'}
    >
        <Typography variant='h5' textTransform={'uppercase'}>
            ChatApp
        </Typography>
    <Stack spacing={'1rem'}>
    {
        adminTabs.map((tab, index) =>(
            <Link key={tab.path} to={tab.path}
            sx={
                location.pathname === tab.path && {
                    bgcolor : matBlack,
                    color : 'white',
                    " : hover" : {color : 'white'}
                }
            }
            >
                <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
                {
                    tab.icon
                }
                <Typography>{tab.name}</Typography>
                </Stack>
            </Link>
        ))
    }
    <Link
     onClick={logoutHandler}
     >
        <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
                <ExitToAppIcon/>
            <Typography>{tab.name}</Typography>
        </Stack>
    </Link>
    </Stack>
    </Stack>
)} 

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