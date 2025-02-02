import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import { Face as FaceIcon , 
  AlternateEmail as UserNameicon , 
  CalendarMonth as CalendarIcon
} from '@mui/icons-material'
import moment from 'moment'

const Profile = () => {
  return (
    <Stack spacing={'2rem'} direction={'column'} alignItems={'center'}>
      <Avatar
      sx={{
        width : '200px',
        height : '200px',
        objectFit : "contain",
        marginBottom : '1rem',
        border : "5px solid white"
      }}
      />
      <ProfileCard 
      heading={'bio'} 
      text={'snvoidjc isrifjw kfjwp'}
      />
      <ProfileCard 
      heading={'username'} 
      text={'@mukulkanojia'} 
      Icon={<UserNameicon/>}
      />
      <ProfileCard 
      heading={'name'} 
      text={'MUKUL KANOJIA'} 
      Icon={<FaceIcon/>}
      />
      <ProfileCard 
      heading={'Joined'} 
      text={moment('2023-11-04T18:30:00.000Z').fromNow()} 
      Icon={<CalendarIcon/>}
      />
    </Stack>
  )
}

const ProfileCard = ({text, Icon, heading})=>{
  return <Stack
  direction={'row'}
  alignItems={'center'}
  spacing={'1rem'}
  color={'white'}
  textAlign={'center'}
  >
    {Icon && Icon}
    <Stack>
      <Typography variant='body1'>{text}</Typography>
      <Typography variant='caption'>{heading}</Typography>
    </Stack>
  </Stack>
}

export default Profile