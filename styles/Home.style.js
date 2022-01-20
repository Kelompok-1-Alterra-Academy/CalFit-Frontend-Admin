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
  countCard: {
    backgroundColor: "#fff",
    borderRadius: "14px",
    padding: "20px",
    height: "200px",
    // paddingTop: "100%",
    // width: "200px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  countCardTitle: {
    fontSize: '1rem',
    fontWeight: 'bold',
    textAlign: 'start',
    alignItems: 'start',
    justifyContent: 'start',
  },
  countNumber: {
    fontSize: '1rem',
    fontWeight: 'bold',
    fontWeight: '600',
    textAlign: 'center',
  },
  table: {
    width: '75%',
    maxWidth: '75%',
  },
}));
