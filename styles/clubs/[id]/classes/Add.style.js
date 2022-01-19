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
  form: {
    display: "flex",
    backgroundColor: "#fff",
    borderRadius: "14px",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "center",
    // height: "auto",
    marginRight: "20px",
    marginLeft: "0",
    maxWidth: "100%",
    // width: "900px !important",
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
  textFieldTitle: {
    textAlign: 'left',
    marginBottom: 0,
  },
  loginForm: {
    margin: "30px 10%",
    // padding: "10px",
  },
  button: {
    backgroundColor: "black",
    color: "white",
    width: "100%",
  },
}));
