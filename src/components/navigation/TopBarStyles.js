import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    borderRadius: '0 0 20px 20px',
    margin: '0 0 20px 0',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    padding: '0 30px 0 30px',
    zIndex: '100',
    position: 'sticky',
    top: '0',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
  },
  main: {
    padding: '0',
    display: 'flex',
    flexDirection: 'row',
  },
  topBar: {
    width: '90%',
    display: 'flex',
    height: '64px',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 'auto',
  },
  profilePicture: {
    borderRadius: '50%',
  },
  pageTitle: {
    marginLeft: '16px !important',
    color: '#000',
    fontSize: '14px',
    fontWeight: '500',
    textAlign: 'left',
  },
}));

export default useStyles;
