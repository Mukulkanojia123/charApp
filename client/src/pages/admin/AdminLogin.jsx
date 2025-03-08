import React, { useState } from 'react'
import { Stack,Button, Container, Paper, Typography, Avatar, IconButton } from '@mui/material'
import TextField from '@mui/material/TextField';
import {CameraAlt as CameraAltIcon} from '@mui/icons-material'
import { VisuallyHiddenInput } from './../../components/styles/StyledComponents';
import {useFileHandler, useInputValidation, useStrongPassword} from '6pp'
import { usernamevalidator } from './../../utils/validators';
import { Navigate } from 'react-router-dom';

const isAdmin = false
const AdminLogin = () => {

    const secretKey = useInputValidation("")

    const submitHandler = (e)=>{
        e.preventDefault();
    }

    if(isAdmin) return <Navigate to="/admin/dashboard"/>

  return (
    <div
        style={{
            backgroundImage : "linear-gradient(rgb(255, 225, 209), rgb(249, 159, 159))"
        }}
        >
        <Container 
        component={"main"} 
        maxWidth='xs' 
        sx={{
            height:"100vh",
            display: 'flex',
            justifyContent : 'center',
            alignItems : 'center'
        }}
        >
            <Paper elevation={3} sx={{ padding: 4,
                 display: 'flex', 
                 flexDirection: 'column', 
                 alignItems: 'center',
                //  width: '100%' 
                 }}>
                
                    <Typography variant='h5'>Admin Login</Typography>
                    <form
                    style={{
                        width : '100%',
                        marginTop : '1rem'
                    }}
                    onSubmit={submitHandler}
                    >
                        
                        <TextField required fullWidth label="SecretKey" type="SecretKey"margin="normal" variant="outlined" value={secretKey.value} onChange={secretKey.changeHandler}/>
                        <Button variant='contained' color='primary' type='submit' fullWidth>Login</Button>
                        
                    </form>
                    
                </Paper>
        </Container>
        </div>
  )
}

export default AdminLogin