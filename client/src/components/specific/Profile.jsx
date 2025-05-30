import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import { Face as FaceIcon , 
  AlternateEmail as UserNameicon , 
  CalendarMonth as CalendarIcon
} from '@mui/icons-material'
import moment from 'moment'
import { transforImage } from '../../lib/features'

const Profile = ({user}) => {
  return (
    <Stack spacing={'2rem'} direction={'column'} alignItems={'center'}>
      <Avatar
      src={transforImage(user?.avatar?.url)}
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
      text={user?.bio}
      />
      <ProfileCard 
      heading={'username'} 
      text={user?.username } 
      Icon={<UserNameicon/>}
      />
      <ProfileCard 
      heading={'name'} 
      text={user?.name} 
      Icon={<FaceIcon/>}
      />
      <ProfileCard 
      heading={'Joined'} 
      text={moment(user?.createdAt).fromNow()} 
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