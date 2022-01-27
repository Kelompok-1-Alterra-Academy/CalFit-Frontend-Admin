import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { TextField, Button, InputAdornment, IconButton, Typography, Box, Link as MaterialLink } from '@mui/material';
import { VisibilityOff, Visibility, Google } from '@mui/icons-material';
import { setCookie } from 'nookies';
// import { CustomAlert } from "../alert/Alert";
import { useStyles } from '../../../styles/login/Index.style';
import { superadminLogin } from '../../../src/utils/fetchApi/auth';
import { passwordValidation } from '../../../src/utils/validation/validation';
import jwtDecode from '../../../src/utils/jwtDecode/jwtDecode';

export default function Login() {
  const classes = useStyles();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState({
    username: {
      status: false,
      message: '',
    },
    password: {
      status: false,
      message: '',
    },
  });
  const [alert, setAlert] = useState({
    status: false,
    message: '',
  });

  useEffect(() => {
    if (window.localStorage) {
      if (!localStorage.getItem('firstLoad')) {
        localStorage.setItem('firstLoad', true);
        window.location.reload();
      } else localStorage.removeItem('firstLoad');
    }
    const { Email: email } = jwtDecode();
    if (email) {
      router.push('/superadmin/dashboard');
    }
  }, []);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleOnChange = (e) => {
    switch (e.target.name) {
      case 'username':
        setData({ ...data, username: e.target.value });
        break;
      case 'password':
        setData({ ...data, password: e.target.value });
        passwordValidation(e.target.value)
          ? setError({ ...error, password: { status: false, message: '' } })
          : setError({
              ...error,
              password: {
                status: true,
                message: 'password must be at least 6 char contain number, lowercase and uppercase letter',
              },
            });
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (data.username === '' || data.password == '') {
      setAlert({
        status: true,
        message: 'please fill all fields',
      });
    } else {
      const res = await superadminLogin(setLoading, setAlert, data);
      console.log(res);
      setCookie(null, 'token', res.data.data.token);
      switch (res.status) {
        case 200:
          router.push('/superadmin/dashboard');
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className={classes.root}>
      <Head>
        <title>Login</title>
      </Head>

      <div className={classes.innerBox}>
        <Image src='/calfit-logo-invert.png' alt='CalFit Logo' width={301} height={71} />
        <Box component='form' className={classes.loginForm} onSubmit={(e) => handleOnSubmit(e)}>
          <TextField
            className={classes.textField}
            label='Username'
            name='username'
            path='text'
            onChange={(e) => handleOnChange(e)}
            error={error.username.status}
            helperText={error.username.message}
          ></TextField>
          <TextField
            className={classes.textField}
            label='Password'
            name='password'
            value={data.password}
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => handleOnChange(e)}
            error={error.password.status}
            helperText={error.password.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>
          <Button type='submit' variant='contained' className={classes.button}>
            Login
          </Button>
        </Box>
      </div>
    </div>
  );
}
