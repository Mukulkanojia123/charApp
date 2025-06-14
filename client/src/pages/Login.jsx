import { useFileHandler, useInputValidation, useStrongPassword } from '6pp';
import { CameraAlt as CameraAltIcon } from '@mui/icons-material';
import { Avatar, Button, Container, IconButton, Paper, Stack, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { server } from '../components/constants/config';
import { VisuallyHiddenInput } from '../components/styles/StyledComponents';
import { usernamevalidator } from '../utils/validators';


const Login = () => {

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const toggleLogin = () => setIsLogin(!isLogin)

  const dispatch = useDispatch()

  const name = useInputValidation("")
  const bio = useInputValidation("")
  const username = useInputValidation("", usernamevalidator)
  const password = useStrongPassword("")

  const avatar = useFileHandler('single')

  const handleSighup = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Signing Up...");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );

      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  }


  const handleLogin = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Logging In...");

    setIsLoading(true);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        config
      );
      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      style={{
        backgroundImage: "linear-gradient(rgb(255, 225, 209), rgb(249, 159, 159))"
      }}
    >
      <Container
        component={"main"}
        maxWidth='xs'
        sx={{
          height: "100vh",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Paper elevation={3} sx={{
          padding: 4,
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
                    width: '100%',
                    marginTop: '1rem'
                  }}
                  onSubmit={handleLogin}
                >
                  <TextField required fullWidth label="username" margin="normal" variant="outlined" value={username.value} onChange={username.changeHandler} />
                  <TextField required fullWidth label="password" type="password" margin="normal" variant="outlined" value={password.value} onChange={password.changeHandler} />
                  <Button
                    sx={{
                      marginTop: "1rem",
                    }}
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    disabled={isLoading}
                  >
                    Login
                  </Button>
                  <Typography>OR</Typography>
                  <Button
                    disabled={isLoading}
                    fullWidth
                    variant="text"
                    onClick={toggleLogin}
                  >
                    Sign Up Instead
                  </Button>
                </form>
              </>
            ) : (
              <>
                <Typography variant='h5'>Register</Typography>
                <form
                  style={{
                    width: '100%',
                    marginTop: '1rem'
                  }}
                  onSubmit={handleSighup}
                >
                  <Stack position={'relative'} width={'10rem'} margin={'auto'}>
                    <Avatar sx={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: 'contain'
                    }}
                      src={avatar.preview}
                    />

                    <IconButton sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      color: 'white',
                      bgcolor: 'rgba(0,0,0,0.5)',
                      ":hover": {
                        bgcolor: "rgbs(0,0,0,0.7)"
                      }
                    }}
                      component="label"
                    >
                      <>
                        <CameraAltIcon />
                        <VisuallyHiddenInput type='file' onChange={avatar.changeHandler} />
                      </>
                    </IconButton>
                  </Stack>
                  {
                    avatar.error && (
                      <Typography color='error' m={"1rem"} variant='caption'>{avatar.error}</Typography>
                    )

                  }
                  <TextField required fullWidth label="Name" margin="normal" variant="outlined" value={name.value} onChange={name.onChange} />
                  <TextField required fullWidth label="username" margin="normal" variant="outlined" value={username.value} onChange={username.changeHandler} />
                  {
                    username.error && (
                      <Typography color='error' variant='caption'>{username.error}</Typography>
                    )

                  }
                  <TextField required fullWidth label="BIO" margin="normal" variant="outlined" value={bio.value} onChange={bio.changeHandler} />
                  <TextField required fullWidth label="password" type="password" margin="normal" variant="outlined" value={password.value} onChange={password.changeHandler} />
                  {
                    password.error && (
                      <Typography color='error' variant='caption'>{password.error}</Typography>
                    )

                  }
                  <Button variant='contained' color='primary' type='submit' fullWidth>Register</Button>
                  <Typography>OR</Typography>
                  <Button sx={{ width: '100%', marginTop: "1rem" }} variant='text' color="secondary" fullWidth onClick={toggleLogin}>Click to Login</Button>
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