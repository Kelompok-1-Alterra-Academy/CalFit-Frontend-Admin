import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flow-root",
    minHeight: "100vh",
    margin: "auto",
    textAlign: "center",
    backgroundColor: "#f6f6f6",
    display: "flex",
    alignItems: "center",
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
