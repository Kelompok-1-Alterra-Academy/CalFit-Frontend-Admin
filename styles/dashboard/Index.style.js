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
  menuBox: {
    display: "flex",
    backgroundColor: "#fff",
    borderRadius: "14px",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "center",
    height: "auto",
    marginRight: "20px",
    marginLeft: "0",
    width: "20%",
    maxHeight: "400px",
  },
  menu: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    height: "40px",
    margin: "5px 0",
    alignItems: "center",
  },
  menuIcon: {
    margin: "0 10px",
  },
  selectedMenu: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "40px",
    margin: "5px 0",
    backgroundColor: "#2F80ED40",
    borderRadius: "5px",
    color: "#2F80ED",
  },
  innerBox: {
    margin: "auto",
    backgroundColor: "#fff",
    padding: 20,
    width: "40%",
    borderRadius: 15,
  },
  textField: {
    margin: "20px 0",
    width: "100%",
    "& label.Mui-focused": {
      color: "#6200EE",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#6200EE",
      },
    },
  },
  loginForm: {
    margin: "30px 10%",
  },
  button: {
    backgroundColor: "black",
    color: "white",
    width: "100%",
  },
  link: {
    color: theme.palette.secondary,
    textDecoration: "none",
    cursor: "pointer",
  },
}));
