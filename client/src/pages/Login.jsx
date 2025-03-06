import React, { useState } from 'react'
import { Stack,Button, Container, Paper, Typography, Avatar, IconButton } from '@mui/material'
import TextField from '@mui/material/TextField';
import {CameraAlt as CameraAltIcon} from '@mui/icons-material'
import { VisuallyHiddenInput } from '../components/styles/StyledComponents';
import {useFileHandler, useInputValidation, useStrongPassword} from '6pp'
import { usernamevalidator } from '../utils/validators';


const Login = () => {

    const [isLogin , setIslogin] = useState(true);

    const toggleLogin = () => setIslogin(!isLogin)

    const name = useInputValidation("")
    const bio = useInputValidation("")
    const username = useInputValidation("", usernamevalidator)
    const password = useStrongPassword("")

    const avatar = useFileHandler('single')

    const handleSighup = (e) =>{
        e.preventDefault()
    }
    const handleLogin = (e) =>{
        e.preventDefault()
    }
    
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
                {
                    isLogin ? (
                    <>
                    <Typography variant='h5'>Login</Typography>
                    <form
                    style={{
                        width : '100%',
                        marginTop : '1rem'
                    }}
                    onSubmit={handleLogin}
                    >
                        <TextField required fullWidth label="username" margin="normal" variant="outlined" value={username.value} onChange={username.changeHandler}/>
                        <TextField required fullWidth label="password" type="password"margin="normal" variant="outlined" value={password.value} onChange={password.changeHandler}/>
                        <Button variant='contained' color='primary' type='submit' fullWidth>Login</Button>
                        <Typography>OR</Typography>
                        <Button sx={{width:'100%', marginTop:"1rem"}} variant='text' color="secondary" fullWidth onClick={toggleLogin}>Click to Register</Button>
                    </form>
                    </>
                    ) : (
                        <>
                        <Typography variant='h5'>Register</Typography>
                        <form
                        style={{
                            width : '100%',
                            marginTop : '1rem'
                        }}
                        onSubmit={handleSighup}
                        >
                            <Stack position={'relative'} width={'10rem'} margin={'auto'}>
                            <Avatar sx={{
                                width : "10rem",
                                height : "10rem",
                                objectFit : 'contain'
                            }}
                            src={avatar.preview}
                            />
                            
                            <IconButton sx={{
                                position : 'absolute',
                                bottom: 0,
                                right : 0,
                                color : 'white',
                                bgcolor : 'rgba(0,0,0,0.5)',
                                ":hover":{
                                    bgcolor:"rgbs(0,0,0,0.7)"
                                }
                            }}
                            component="label"
                            >
                                <>
                                <CameraAltIcon/>
                                <VisuallyHiddenInput type='file'onChange={avatar.changeHandler}/>
                                </>
                            </IconButton>
                            </Stack>
                            {
                                avatar.error && (
                                    <Typography color='error' m={"1rem"} variant='caption'>{avatar.error}</Typography>
                                )
                                
                            }
                            <TextField required fullWidth label="Name" margin="normal" variant="outlined" value={name.value} onChange={name.onChange}/>
                            <TextField required fullWidth label="username" margin="normal" variant="outlined" value={username.value} onChange={username.changeHandler}/>
                            {
                                username.error && (
                                    <Typography color='error' variant='caption'>{username.error}</Typography>
                                )
                                
                            }
                            <TextField required fullWidth label="BIO" margin="normal" variant="outlined" value={bio.value} onChange={bio.changeHandler}/>
                            <TextField required fullWidth label="password" type="password"margin="normal" variant="outlined"value={password.value} onChange={password.changeHandler}/>
                            {
                                password.error && (
                                    <Typography color='error' variant='caption'>{password.error}</Typography>
                                )
                                
                            }
                            <Button variant='contained' color='primary' type='submit' fullWidth>Register</Button>
                            <Typography>OR</Typography>
                            <Button sx={{width:'100%', marginTop:"1rem"}} variant='text' color="secondary" fullWidth onClick={toggleLogin}>Click to Login</Button>
                        </form>
                        </>
                )
                }
                </Paper>
        </Container>
        </div>
    )
}

export default Login