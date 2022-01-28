import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import MaterialTable from 'material-table';
import { Grid } from '@mui/material';
import { useStyles } from '../../../styles/clubs/Index.style';
import { TopBar } from '../../../src/components/navigation/TopBar';
import { MenuBar } from '../../../src/components/navigation/MenuBar';
import { tableIcons } from '../../../src/components/table/MaterialTable';
import { getAllGyms } from '../../../src/utils/fetchApi/clubs';
import { deleteGym } from '../../../src/utils/fetchApi/clubs';
import jwtDecode from '../../../src/utils/jwtDecode/jwtDecode';

const setAddress = (address) => {
  return `${address.address}, ${address.district}, ${address.city}`;
};

export default function ClubsSuperAdmin() {
  const classes = useStyles();
  const router = useRouter();
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [alertClubs, setAlertClubs] = useState({
    status: false,
    message: '',
  });

  useEffect(() => {
    const { OperationalAdmin: opadmin } = jwtDecode();
    if (!opadmin) router.push('/admin/login');
    else {
      setIsAuthenticated(true);
      getAllGyms(setLoading, setClubs, { limit: 1000, page: 1 });
    }
  }, []);

  useEffect(() => {
    clubs?.map((club) => {
      club.addressString = club.address.address;
    });
  }, [clubs]);

  const handleDelete = async (id) => {
    const res = await deleteGym(setLoading, setAlertClubs, id);
    if (res.status === 202) {
      setClubs(clubs.filter((club) => club.id !== id));
      return true;
    }
    return false;
  };

  return (
    isAuthenticated && (
      <div className={classes.root}>
        <Head>
          <title>Clubs Page</title>
          <meta name='description' content='Generated by create next app' />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <TopBar />

        <main className={classes.main}>
          <Grid container spacing={2} m={2}>
            <Grid item xs={3}>
              <MenuBar selected={'Clubs'} />
            </Grid>
            <Grid item xs={9}>
              <MaterialTable
                className={classes.table}
                title='Clubs'
                icons={tableIcons}
                columns={[
                  { title: 'Id', field: 'id', width: '10%' },
                  { title: 'Name', field: 'name' },
                  {
                    title: 'Admin',
                    field: 'operationalAdminId',
                    width: '10%',
                  },
                  { title: 'Telephone', field: 'telephone', width: '10%' },
                  { title: 'Address', field: 'addressString' },
                ]}
                data={clubs}
                actions={[
                  {
                    icon: tableIcons.ListAlt,
                    tooltip: 'View Classes',
                    onClick: (event, rowData) => router.push(`/superadmin/clubs/${rowData.id}/classes`),
                  },
                  {
                    icon: tableIcons.Booking,
                    tooltip: 'View Bookings',
                    // onClick: (event, rowData) => router.push(`/superadmin/clubs/${rowData.id}/classes`),
                    onClick: (event, rowData) => router.push(`/superadmin/clubs/${rowData.id}/bookings`),
                  },
                  {
                    icon: tableIcons.Edit,
                    tooltip: 'Edit Club',
                    onClick: (event, rowData) => router.push(`/superadmin/clubs/${rowData.id}/edit`),
                  },
                  (rowData) => ({
                    icon: tableIcons.Delete,
                    tooltip: 'Delete Club',
                    onClick: (event, rowData) => {
                      const isDelete = confirm(`You want to delete ${rowData.name}(id: ${rowData.id}) ?`);
                      if (isDelete) {
                        const success = handleDelete(rowData.id);
                        if (success) alert(`You deleted ${rowData.name}(id: ${rowData.id})`);
                        else alert(`Can't delete ${rowData.name}(id: ${rowData.id})`);
                      }
                    },
                    // disabled: rowData.birthYear < 2000
                  }),
                  {
                    icon: tableIcons.Add,
                    tooltip: 'Add New Club',
                    isFreeAction: true,
                    onClick: (event) => router.push('/superadmin/clubs/add'),
                  },
                ]}
                options={{
                  actionsColumnIndex: -1,
                }}
              />
            </Grid>
          </Grid>
        </main>
      </div>
    )
  );
}