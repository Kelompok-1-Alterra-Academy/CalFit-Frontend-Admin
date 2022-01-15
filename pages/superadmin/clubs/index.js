import { useState, useEffect } from 'react';
import Head from "next/head";
import MaterialTable from "material-table";
import { useStyles } from "../../../styles/clubs/Index.style";
import { TopBar } from "../../../src/components/navigation/TopBar";
import { MenuBar } from "../../../src/components/navigation/MenuBar";
import { tableIcons } from "../../../src/components/table/MaterialTable";
import { getAllGyms } from "../../../src/utils/fetchApi/clubs";

const setAddress = (address) => {
  return `${address.address}, ${address.district}, ${address.city}`
}

export default function ClubsSuperAdmin() {
  const classes = useStyles();
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllGyms(setLoading, setClubs, { limit: 1000, page: 1 });
  }, []);

  useEffect(() => {
    clubs.map(club => {
      club.addressString = club.address.address
    })
  }, [clubs]);


  return (
    <div className={classes.root}>
      <Head>
        <title>Clubs Page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TopBar />

      <main className={classes.main}>
        <MenuBar selected={"Clubs"} />
        <MaterialTable
          style={{
            width: "75%",
            maxWidth: "75%",
          }}
          title="Clubs"
          icons={tableIcons}
          columns={[
            { title: 'Name', field: 'name' },
            {
              title: 'Admin', field: 'operationalAdminId',
              width: '10%',
            },
            { title: 'Telephone', field: 'telephone', width: '10%' },
            { title: 'Address', field: 'addressString' },
          ]}
          data={clubs}
          actions={[
            {
              icon: tableIcons.Edit,
              tooltip: 'Edit Club',
              onClick: (event, rowData) => alert("You saved " + rowData.name)
            },
            rowData => ({
              icon: tableIcons.Delete,
              tooltip: 'Delete Club',
              onClick: (event, rowData) => confirm("You want to delete " + rowData.name),
              // disabled: rowData.birthYear < 2000
            }),
            {
              icon: tableIcons.Add,
              tooltip: 'Add New Club',
              isFreeAction: true,
              onClick: (event) => alert("You want to add a new row")
            }
          ]}
          options={{
            actionsColumnIndex: -1
          }}
        />

      </main>
    </div>
  );
}
