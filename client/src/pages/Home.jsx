import { Box, Typography } from '@mui/material';
import { grayColor } from '../components/constants/color';
import AppLayout from '../components/layout/AppLayout';

const Home = () => {
  return (
    <Box bgcolor={grayColor} height={"100%"} >
    <Typography p={'2rem'} variant='h5' textAlign={'center'}>select a friend to chat</Typography>
    </Box>
  )
}

export default AppLayout(Home);
// export default AppLayout(Home)
