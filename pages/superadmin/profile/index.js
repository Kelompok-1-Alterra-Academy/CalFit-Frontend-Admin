import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { useStyles } from '../../../styles/profile/Index.style';
import { TopBar } from '../../../src/components/navigation/TopBar';
import { MenuBar } from '../../../src/components/navigation/MenuBar';
import { passwordValidation } from '../../../src/utils/validation/validation';
import { superadminUpdatePassword } from '../../../src/utils/fetchApi/auth';
import jwtDecode from '../../../src/utils/jwtDecode/jwtDecode';

const emptyData = {
  username: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export default function AccountSuperAdmin() {
  const classes = useStyles();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(emptyData);
  const [error, setError] = useState({
    currentPassword: { status: false, message: '' },
    newPassword: { status: false, message: '' },
    confirmPassword: { status: false, message: '' },
  });
  const [alertProfile, setAlertProfile] = useState({
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
    if (email) setData({ ...data, username: email });
  }, [])

  const handleOnChange = (e) => {
    switch (e.target.name) {
      case 'newPassword':
        setData({ ...data, newPassword: e.target.value });
        setError({
          ...error, newPassword: passwordValidation(e.target.value) ?
            { status: false, message: '' } :
            {
              status: true, message: "password must be at least 6 char contain number, lowercase and uppercase letter"
            },
        });
        break;
      case 'confirmPassword':
        setData({ ...data, confirmPassword: e.target.value });
        setError({
          ...error, confirmPassword: data.newPassword === e.target.value ?
            { status: false, message: '' } :
            { status: true, message: "password doesn't match" },
        });
        break;
      default:
        setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    const res = await superadminUpdatePassword(setLoading, setAlertProfile, {
      username: data.username,
      password: data.currentPassword,
      newPassword: data.newPassword,
    });
    if (res.status === 200) {
      setData(emptyData);
      setError({
        currentPassword: { status: false, message: '' },
        newPassword: { status: false, message: '' },
        confirmPassword: { status: false, message: '' },
      });
    } else if (res.status === 400) {
      setError({
        ...error,
        currentPassword: {
          status: true,
          message: 'current password is wrong',
        },
      });
    }
  };

  const handleDelete = async (id) => {
    // const res = await deleteGym(setLoading, setAlertProfile, id);
    // if (res.status === 202) {
    //   setBookings(clubs.filter((club) => club.id !== id));
    //   return true;
    // }
    // return false;
  };

  return (
    <div className={classes.root}>
      <Head>
        <title>Account Page</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <TopBar />

      <main className={classes.main}>
        <Grid container spacing={2} m={2}>
          <Grid item xs={3} >
            <MenuBar selected={'Account'} />
          </Grid>
          <Grid container item xs={9} spacing={2}>
            <Grid item xs={6} >
              <Container className={classes.accountCard}>
                <Typography variant='h4' gutterBottom>
                  Update Password
                </Typography>
                <Typography variant='h4' gutterBottom>
                  Ensure your account is using a long and random password to stay secure.
                </Typography>
                <Box
                  component='form'
                  className={classes.loginForm}
                  onSubmit={(e) => handleUpdatePassword(e)}
                  style={{
                    opacity: loading ? 0.3 : 1,
                    pointerEvents: loading ? 'none' : 'all',
                  }}
                >
                  <TextField
                    className={classes.textField}
                    label='Current Password'
                    name='currentPassword'
                    path='text'
                    type='password'
                    value={data.currentPassword}
                    onChange={(e) => handleOnChange(e)}
                    error={error.currentPassword.status}
                    helperText={error.currentPassword.message}
                    required
                  ></TextField>
                  <TextField
                    className={classes.textField}
                    label='New Password'
                    name='newPassword'
                    path='text'
                    type='password'
                    value={data.newPassword}
                    onChange={(e) => handleOnChange(e)}
                    error={error.newPassword.status}
                    helperText={error.newPassword.message}
                    required
                  ></TextField>
                  <TextField
                    className={classes.textField}
                    label='Confirm New Password'
                    name='confirmPassword'
                    path='text'
                    type='password'
                    value={data.confirmPassword}
                    onChange={(e) => handleOnChange(e)}
                    error={error.confirmPassword.status}
                    helperText={error.confirmPassword.message}
                    required
                  ></TextField>
                  {loading ? (
                    <Button type='submit' variant='contained' className={classes.button} disabled>
                      CHANGE PASSWORD
                    </Button>
                  ) : (
                    <Button type='submit' variant='contained' className={classes.button}>
                      CHANGE PASSWORD
                    </Button>
                  )}
                </Box>
              </Container>
            </Grid>
            <Grid item xs={6} >
              <Container className={classes.accountCard}>
                <Typography variant='h4' gutterBottom>
                  Delete Account
                </Typography>
                <Typography variant='h4' gutterBottom>
                  Permanently delete your account and all your data.
                </Typography>
                <Typography variant='h4' gutterBottom>
                  Once your account is deleted, all of its resources and data will be permanently deleted.
                </Typography>
                <Button type='submit' variant='contained' className={classes.button} onClick={(event, rowData) => {
                  const isDelete = confirm(`Are you sure you want to delete this account?`);
                  if (isDelete) {
                    const success = handleDelete(rowData.id);
                    if (success) alert(`Account has been deleted`);
                    else alert(`Account has not been deleted`);
                  }
                }}>
                  DELETE ACCOUNT
                </Button>
              </Container>
            </Grid>
          </Grid>
        </Grid>
      </main>
    </div >
  );
}

// import Head from 'next/head';
// import Image from 'next/image';
// import Link from 'next/link';
// import styles from '../../../styles/Home.module.css';

// export default function ProfileSuperAdmin() {
//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>Calfit Profile SuperAdmin</title>
//         <meta name='description' content='Generated by create next app' />
//         <link rel='icon' href='/favicon.ico' />
//       </Head>

//       <main className={styles.main}>
//         <h1>Profile</h1>
//         <Link href='/superadmin/dashboard' passHref>
//           <div className={styles.newsdetail}>SuperAdmin Dashboard</div>
//         </Link>
//         <Link href='/superadmin/classes' passHref>
//           <div className={styles.newsdetail}>SuperAdmin Classes Access</div>
//         </Link>
//         <Link href='/superadmin/newsletters' passHref>
//           <div className={styles.newsdetail}>SuperAdmin Newsletters Access</div>
//         </Link>
//         <Link href='/superadmin/videos' passHref>
//           <div className={styles.newsdetail}>SuperAdmin Videos Access</div>
//         </Link>
//         <Link href='/superadmin/clubs' passHref>
//           <div className={styles.newsdetail}>SuperAdmin Clubs Access</div>
//         </Link>
//         <Link href='/superadmin/admins' passHref>
//           <div className={styles.newsdetail}>SuperAdmin Admins Access</div>
//         </Link>
//       </main>

//       <footer className={styles.footer}>
//         <a
//           href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
//           target='_blank'
//           rel='noopener noreferrer'
//         >
//           Powered by{' '}
//           <span className={styles.logo}>
//             <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
//           </span>
//         </a>
//       </footer>
//     </div>
//   );
// }
