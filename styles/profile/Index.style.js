import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flow-root",
    minHeight: "100vh",
    margin: "0",
    padding: "0",
    textAlign: "center",
    backgroundColor: "#f6f6f6",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  main: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    maxWidth: "1400px",
    justifyContent: "space-around",
  },
  table: {
    width: '75%',
    maxWidth: '75%',
  },
  accountCard: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '14px',
    height: '390px',
  },
  accountCardTitle: {
    fontSize: '24px',
    fontWeight: '600',
    textAlign: 'left',
  },
  accountCardDescription: {
    fontSize: '14px',
    fontWeight: '500',
    textAlign: 'left',
    marginTop: '10px',
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textField: {
    margin: '10px',
  },
}));
