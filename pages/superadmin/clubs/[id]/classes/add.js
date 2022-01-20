import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  Box, Button, Container,
  FormControl,
  FormControlLabel, FormLabel, Grid,
  InputLabel,
  MenuItem, Radio,
  RadioGroup,
  Select,
  TextField, Typography
} from '@mui/material';
import { useStyles } from '../../../../../styles/clubs/[id]/classes/Add.style';
import { TopBar } from '../../../../../src/components/navigation/TopBar';
import { MenuBar } from '../../../../../src/components/navigation/MenuBar';
import { urlValidation } from '../../../../../src/utils/validation/validation';
import { createClass } from '../../../../../src/utils/fetchApi/classes';
import { cloudinaryUploadApi } from '../../../../../src/utils/fetchApi/api';

const emptyData = {
  name: '',
  membershipTypeId: 0,
  description: '',
  category: '',
  online: false,
  link: '',
  price: 0,
  bannerPictureUrl: '',
  cardPictureUrl: '',
  status: '',
};

export default function AddClass() {
  const classes = useStyles();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(emptyData);
  const [cardPicture, setCardPicture] = useState('');
  const [bannerPicture, setBannerPicture] = useState('');
  const [isOnline, setIsOnline] = useState(false);
  const [error, setError] = useState({
    name: { status: false, message: '' },
    membershipTypeId: { status: false, message: '' },
    description: { status: false, message: '' },
    category: { status: false, message: '' },
    online: { status: false, message: '' },
    link: { status: false, message: '' },
    price: { status: false, message: '' },
    bannerPictureUrl: { status: false, message: '' },
    cardPictureUrl: { status: false, message: '' },
    status: { status: false, message: '' },
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
  }, [])

  const handleOnChange = (e) => {
    switch (e.target.name) {
      case 'membershipTypeId':
        setData({ ...data, membershipTypeId: parseInt(e.target.value) });
        break;
      case 'price':
        setData({ ...data, price: parseInt(e.target.value) });
        break;
      case 'online':
        setIsOnline(e.target.value === 'true');
        setData({ ...data, online: e.target.value === 'true', link: e.target.value === 'true' ? data.link : '' });
        break;
      case 'link':
        setData({ ...data, link: e.target.value });
        setError({
          ...error, link: urlValidation(e.target.value) ?
            { status: false, message: '' } :
            { status: true, message: 'please enter a valid url' },
        });
        break;
      default:
        setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const handleChangePicture = (e) => {
    if (!e.target.files[0])
      setError({ ...error, [e.target.name]: { status: true, message: 'picture is required' } });
    if (e.target.files[0].size > 5000000)
      setError({ ...error, [e.target.name]: { status: true, message: 'picture size must be less than 5MB' } });
    if (e.target.files[0].type !== 'image/jpeg' && e.target.files[0].type !== 'image/png')
      setError({ ...error, [e.target.name]: { status: true, message: 'picture must be a jpeg or png' } });

    if (e.target.name === 'cardPicture') setCardPicture(e.target.files[0]);
    else if (e.target.name === 'bannerPicture') setBannerPicture(e.target.files[0]);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { name, description, category, online, status, price } = data;
    if (
      name === '' ||
      description === '' ||
      category === '' ||
      status === '' ||
      online === '' ||
      price === ''
    ) {
      setAlert({
        status: true,
        message: 'please fill all fields',
      });
    } else {
      setLoading(true);
      const bannerPict = await cloudinaryUploadApi(bannerPicture);
      const cardPict = await cloudinaryUploadApi(cardPicture);
      const newData = {
        ...data,
        bannerPictureUrl: bannerPict,
        cardPictureUrl: cardPict,
      };
      if (!newData.bannerPictureUrl) {
        setError({ ...error, bannerPictureUrl: { status: true, message: 'banner picture is required' } });
        setAlert({ status: true, message: 'please upload a banner picture' });
        if (!newData.cardPictureUrl) {
          setError({ ...error, cardPictureUrl: { status: true, message: 'card picture is required' } });
          setAlert({ status: true, message: 'please upload a card picture' });
        }
      }
      else {
        const res = await createClass(setAlert, newData, router.query.id);
        if (res?.status === 201) {
          setData(emptyData);
          router.push(`/superadmin/clubs/${router.query.id}/classes`);
        }
      }
      setLoading(false);
    }
  };

  return (
    <div className={classes.root}>
      <Head>
        <title>Add New Club</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <TopBar />

      <main className={classes.main}>
        <Grid container spacing={2} m={2}>
          <Grid item xs={3} >
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
                <Typography variant='h3' align='center' className={classes.formTitle}>Add New Class</Typography>
                <TextField
                  className={classes.textField}
                  label='Name'
                  name='name'
                  path='text'
                  value={data.name}
                  onChange={(e) => handleOnChange(e)}
                  error={error.name.status}
                  helperText={error.name.message}
                  required
                ></TextField>
                <TextField
                  className={classes.textField}
                  label='Membership Type Id'
                  name='membershipTypeId'
                  path='text'
                  type='number'
                  value={data.membershipTypeId}
                  onChange={(e) => handleOnChange(e)}
                  error={error.membershipTypeId.status}
                  helperText={error.membershipTypeId.message}
                ></TextField>
                <TextField
                  className={classes.textField}
                  label='Description'
                  multiline
                  minRows={3}
                  name='description'
                  path='text'
                  value={data.description}
                  onChange={(e) => handleOnChange(e)}
                  error={error.description.status}
                  helperText={error.description.message}
                  required
                ></TextField>
                <TextField
                  className={classes.textField}
                  label='Category'
                  name='category'
                  path='text'
                  value={data.category}
                  onChange={(e) => handleOnChange(e)}
                  error={error.category.status}
                  helperText={error.category.message}
                  required
                ></TextField>
                <FormControl fullWidth required>
                  <FormLabel id='online' className={classes.textFieldTitle}>Type</FormLabel>
                  <RadioGroup row aria-label='online' name='online' value={data.online} onChange={(e) => handleOnChange(e)}>
                    <FormControlLabel value={'true'} control={<Radio />} label='Online' />
                    <FormControlLabel value={'false'} control={<Radio />} label='Offline' />
                  </RadioGroup>
                </FormControl>
                {isOnline ?
                  <TextField
                    className={classes.textField}
                    label='Link'
                    name='link'
                    value={data.link}
                    onChange={(e) => handleOnChange(e)}
                    error={error.link.status}
                    helperText={error.link.message}
                    required
                  ></TextField>
                  :
                  <></>
                }
                <TextField
                  className={classes.textField}
                  label='Price'
                  name='price'
                  type='number'
                  value={data.price}
                  onChange={(e) => handleOnChange(e)}
                  error={error.price.status}
                  helperText={error.price.message}
                  thousandSeparator
                  isNumericString
                  prefix="Rp."
                ></TextField>
                <FormControl className={classes.textField} fullWidth required>
                  <InputLabel id='status-label'>Status</InputLabel>
                  <Select
                    labelId='status-label'
                    id='status'
                    name='status'
                    value={data.status}
                    onChange={(e) => handleOnChange(e)}
                    error={error.status.status}
                    helperText={error.status.message}
                    defaultValue='Active'
                  >
                    <MenuItem value={'Active'} defaultChecked>Active</MenuItem>
                    <MenuItem value={'Inactive'}>Inactive</MenuItem>
                  </Select>
                </FormControl>
                <InputLabel id='card-label' className={classes.textFieldTitle}>Card Picture *</InputLabel>
                <TextField
                  labelId='card-label'
                  className={classes.textField}
                  style={{ marginTop: 0 }}
                  placeholder='Picture'
                  type='file'
                  name='cardPicture'
                  onChange={(e) => handleChangePicture(e)}
                  error={error.cardPictureUrl.status}
                  helperText={error.cardPictureUrl.message}
                  required
                ></TextField>
                <InputLabel id='banner-label' className={classes.textFieldTitle}>Banner Picture *</InputLabel>
                <TextField
                  labelId='banner-label'
                  className={classes.textField}
                  style={{ marginTop: 0 }}
                  placeholder='Picture'
                  type='file'
                  name='bannerPicture'
                  onChange={(e) => handleChangePicture(e)}
                  error={error.bannerPictureUrl.status}
                  helperText={error.bannerPictureUrl.message}
                  required
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
    </div >
  );
}
