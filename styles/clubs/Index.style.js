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
}));
