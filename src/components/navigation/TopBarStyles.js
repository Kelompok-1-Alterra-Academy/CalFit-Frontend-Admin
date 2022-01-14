import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    borderRadius: "0 0 25px 25px",
    margin: "0 0 20px 0",
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    padding: "0 30px 0 30px",
  },
  main: {
    padding: "0",
    display: "flex",
    flexDirection: "row",
  },
  topBar: {
    width: "90%",
    display: "flex",
    height: "64px",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "auto",
  },
  profilePicture: {
    borderRadius: "50%",
  },
  pageTitle: {
    marginLeft: "20px !important",
    color: "#000",
    fontSize: "14px",
    fontWeight: "500",
    textAlign: "left",
  },
  arrowBackIcon: {
    color: "#000",
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h1.fontWeight,
    cursor: "pointer",
  },
  arrowBackButton: {
    marginRight: "12px",
    padding: "0",
  },
}));

export default useStyles;
