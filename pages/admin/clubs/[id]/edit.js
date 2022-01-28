import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { useStyles } from '../../../../styles/clubs/[id]/Edit.style';
import { TopBar } from '../../../../src/components/navigation/TopBar';
import { MenuBar } from '../../../../src/components/navigation/MenuBar';
import { telephoneValidation, postalCodeValidation } from '../../../../src/utils/validation/validation';
import { getGymById, updateGym } from '../../../../src/utils/fetchApi/clubs';
import { cloudinaryUploadApi } from '../../../../src/utils/fetchApi/api';
import jwtDecode from '../../../../src/utils/jwtDecode/jwtDecode';

const emptyData = {
  name: '',
  operationalAdminId: 0,
  description: '',
  telephone: '',
  address: '',
  district: '',
  city: '',
  postalCode: '',
  picture: '',
};

export default function UpdateClub() {
  const classes = useStyles();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [club, setClub] = useState(emptyData);
  const [data, setData] = useState(emptyData);
  const [picture, setPicture] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState({
    name: { status: false, message: '' },
    operationalAdminId: { status: false, message: '' },
    description: { status: false, message: '' },
    telephone: { status: false, message: '' },
    address: { status: false, message: '' },
    district: { status: false, message: '' },
    city: { status: false, message: '' },
    postalCode: { status: false, message: '' },
    picture: { status: false, message: '' },
  });
  const [alert, setAlert] = useState({
    status: false,
    message: '',
  });

  useEffect(() => {
    const { OperationalAdmin: opadmin } = jwtDecode();
    if (!opadmin) router.push('/admin/login');
    else setIsAuthenticated(true);
    if (window.localStorage) {
      if (!localStorage.getItem('firstLoad')) {
        localStorage.setItem('firstLoad', true);
        window.location.reload();
      } else localStorage.removeItem('firstLoad');
    }
  }, []);

  useEffect(() => {
    if (router.query.id) {
      getGymById(setLoading, setClub, router.query.id);
    }
  }, [router.query.id]);

  useEffect(() => {
    setData({
      id: club.id,
      name: club.name,
      operationalAdminId: club.operationalAdminId,
      description: club.description,
      telephone: club.telephone,
      address: club.address.address,
      district: club.address.district,
      city: club.address.city,
      postalCode: club.address.postal_code,
      picture: club.picture,
    });
  }, [club]);

  const handleOnChange = (e) => {
    switch (e.target.name) {
      case 'operationalAdminId':
        setData({ ...data, operationalAdminId: parseInt(e.target.value) });
        break;
      case 'telephone':
        setData({ ...data, telephone: e.target.value });
        telephoneValidation(e.target.value)
          ? setError({ ...error, telephone: { status: false, message: '' } })
          : setError({
              ...error,
              telephone: {
                status: true,
                message: 'telephone must be at least 10 characters long and contain only numbers',
              },
            });
        break;
      case 'postalCode':
        setData({ ...data, postalCode: e.target.value });
        postalCodeValidation(e.target.value)
          ? setError({ ...error, postalCode: { status: false, message: '' } })
          : setError({
              ...error,
              postalCode: {
                status: true,
                message: 'postal code must be 5 characters long and contain only numbers',
              },
            });
      default:
        if (e.target.value === '') {
          setError({ ...error, [e.target.name]: { status: false, message: 'please fill in this field' } });
          break;
        }
        setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const handleChangePicture = (e) => {
    if (!e.target.files[0]) return;
    setPicture(e.target.files[0]);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { name, operationalAdminId, description, telephone, address, district, city, postalCode } = data;
    if (
      name === '' ||
      operationalAdminId === '' ||
      description === '' ||
      telephone === '' ||
      address === '' ||
      district === '' ||
      city === '' ||
      postalCode === ''
    ) {
      setAlert({
        status: true,
        message: 'please fill all fields',
      });
    } else {
      setLoading(true);
      let pict;
      if (picture) pict = await cloudinaryUploadApi(picture);
      const newData = {
        ...data,
        picture: picture ? pict : data.picture,
      };
      if (!newData.picture) {
        setError({ ...error, picture: { status: true, message: 'please upload a picture' } });
        setAlert({ status: true, message: 'please upload a picture' });
      } else {
        const res = await updateGym(setAlert, newData);
        if (res?.status === 202) {
          setData(emptyData);
          router.push('/superadmin/clubs');
        }
      }
      setLoading(false);
    }
  };

  return (
    isAuthenticated && (
      <div className={classes.root}>
        <Head>
          <title>Edit {club?.name} Club</title>
          <meta name='description' content='Generated by create next app' />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <TopBar />

        <main className={classes.main}>
          <Grid container spacing={2} m={2}>
            <Grid item xs={3}>
              <MenuBar selected={'Clubs'} />
            </Grid>
            <Grid item xs={9}>
              <Container className={classes.form}>
                <Box
                  component='form'
                  className={classes.loginForm}
                  onSubmit={(e) => handleOnSubmit(e)}
                  style={{
                    opacity: loading ? 0.3 : 1,
                    pointerEvents: loading ? 'none' : 'all',
                  }}
                >
                  <TextField
                    className={classes.textField}
                    label='Name'
                    name='name'
                    path='text'
                    value={data.name}
                    onChange={(e) => handleOnChange(e)}
                    error={error.name.status}
                    helperText={error.name.message}
                  ></TextField>
                  <TextField
                    className={classes.textField}
                    label='Admin Id'
                    name='operationalAdminId'
                    path='text'
                    type='number'
                    value={data.operationalAdminId}
                    onChange={(e) => handleOnChange(e)}
                    error={error.operationalAdminId.status}
                    helperText={error.operationalAdminId.message}
                  ></TextField>
                  <TextField
                    className={classes.textField}
                    label='Description'
                    multiline
                    minRows={5}
                    name='description'
                    path='text'
                    value={data.description}
                    onChange={(e) => handleOnChange(e)}
                    error={error.description.status}
                    helperText={error.description.message}
                  ></TextField>
                  <TextField
                    className={classes.textField}
                    label='Telephone'
                    name='telephone'
                    value={data.telephone}
                    onChange={(e) => handleOnChange(e)}
                    error={error.telephone.status}
                    helperText={error.telephone.message}
                  ></TextField>
                  <TextField
                    className={classes.textField}
                    multiline
                    minRows={3}
                    label='Address'
                    name='address'
                    path='text'
                    value={data.address}
                    onChange={(e) => handleOnChange(e)}
                    error={error.address.status}
                    helperText={error.address.message}
                  ></TextField>
                  <TextField
                    className={classes.textField}
                    label='District'
                    name='district'
                    value={data.district}
                    onChange={(e) => handleOnChange(e)}
                    error={error.district.status}
                    helperText={error.district.message}
                  ></TextField>
                  <TextField
                    className={classes.textField}
                    label='City'
                    name='city'
                    value={data.city}
                    onChange={(e) => handleOnChange(e)}
                    error={error.city.status}
                    helperText={error.city.message}
                  ></TextField>
                  <TextField
                    className={classes.textField}
                    label='Postal Code'
                    name='postalCode'
                    value={data.postalCode}
                    onChange={(e) => handleOnChange(e)}
                    error={error.postalCode.status}
                    helperText={error.postalCode.message}
                  ></TextField>
                  <Typography className={classes.textFieldTitle}>Picture</Typography>
                  <TextField
                    className={classes.textField}
                    style={{ marginTop: 0 }}
                    placeholder='Picture'
                    type='file'
                    name='picture'
                    onChange={(e) => handleChangePicture(e)}
                    error={error.picture.status}
                    helperText={error.picture.message}
                  ></TextField>
                  {loading ? (
                    <Button type='submit' variant='contained' className={classes.button} disabled>
                      SUBMIT
                    </Button>
                  ) : (
                    <Button type='submit' variant='contained' className={classes.button}>
                      SUBMIT
                    </Button>
                  )}
                </Box>
              </Container>
            </Grid>
          </Grid>
        </main>
      </div>
    )
  );
}
