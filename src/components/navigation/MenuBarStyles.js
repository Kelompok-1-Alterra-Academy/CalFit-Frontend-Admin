import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: '#fff',
    borderRadius: '14px',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'center',
    height: 'auto',
    // marginRight: '20px',
    // marginLeft: '20px',
    width: '100%',
    maxHeight: '400px',
    position: 'sticky',
    top: '84px',
    paddingTop: '20px',
    paddingBottom: '20px',
  },
  menu: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    height: '40px',
    margin: '5px 0',
    alignItems: 'center',
  },
  menuIcon: {
    margin: '0 10px',
  },
  selectedMenu: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '40px',
    margin: '5px 0',
    backgroundColor: '#2F80ED30',
    borderRadius: '5px',
    color: '#2F80ED',
  },
}));
