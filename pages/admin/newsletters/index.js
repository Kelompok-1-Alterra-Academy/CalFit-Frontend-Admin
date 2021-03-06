import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import MaterialTable from 'material-table';
import { Grid } from '@mui/material';
import { useStyles } from '../../../styles/classes/Index.style';
import { TopBar } from '../../../src/components/navigation/TopBar';
import { MenuBar } from '../../../src/components/navigation/MenuBar';
import { tableIcons } from '../../../src/components/table/MaterialTable';
import { getAllNewsletters, deleteNewsletter } from '../../../src/utils/fetchApi/newsletters';
import jwtDecode from '../../../src/utils/jwtDecode/jwtDecode';

export default function NewslettersAdmin() {
  const styles = useStyles();
  const router = useRouter();
  const [newslettersList, setNewslettersList] = useState([]);
  const [alertNewsletters, setAlertNewsletters] = useState({
    status: false,
    message: '',
  })
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const { OperationalAdmin: opadmin } = jwtDecode();
    if (!opadmin) router.push('/admin/login');
    else {
      setIsAuthenticated(true);
      getAllNewsletters(setLoading, setNewslettersList, { limit: 1000, page: 1 });
    }
  }, []);

  const handleDelete = async (id) => {
    const res = await deleteNewsletter(setLoading, setAlertNewsletters, Id);
    console.log(res);
    if (res.status === 200) {
      setNewslettersList(newslettersList.filter((newsItem) => newsItem.id !== id));
      return true;
    }
    return false;
  };


  return (
    <div className={styles.root}>
      <Head>
        <title>Calfit Newsletters</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <TopBar/>

      <main className={styles.main}>
        <Grid container spacing={2} m={2}>
          <Grid item xs={3}>
            <MenuBar selected={'Newsletters'} />
          </Grid>
          <Grid item xs={9}>
            <MaterialTable
                className={styles.table}
                title='Newsletters'
                icons={tableIcons}
                columns={[
                  { title: 'Id', field: 'id' },
                  { title: 'Title', field: 'title',  width: '20%'},
                  { title: 'Description', field: 'description'},
                  { title: 'Url Picture', field: 'url_picture', width: '10%' },
                  { title: 'Content', field: 'content' },
                  { title: 'Operational Admin Id', field: 'operationalAdminId', width: '10%'},
                ]}
                data={newslettersList}
                actions={[
                  {
                    icon: tableIcons.Edit,
                    tooltip: 'Edit Newsletters',

                    onClick: (event, rowData) =>
                      router.push(`/superadmin/newsletters/${rowData.id}/edit`),
                  },
                  (rowData) => ({
                    icon: tableIcons.Delete,
                    tooltip: 'Delete Newsletters',
                    onClick: (event, rowData) => {
                      const isDelete = confirm(`You want to delete ${rowData.title}(id: ${rowData.id}) ?`);
                      if (isDelete) {
                        const success = handleDelete(rowData.id);
                        if (success) alert(`You deleted ${rowData.title}(id: ${rowData.id})`);
                        else alert(`Can't delete ${rowData.title}(id: ${rowData.id})`);
                      }
                    },
                  }),
                  // {
                  //   icon: tableIcons.Add,
                  //   tooltip: 'Add New Class',
                  //   isFreeAction: true,
                  //   onClick: (event) => router.push('/superadmin/classes/add'),
                  // },
                ]}
                options={{
                  actionsColumnIndex: -1,
                }}
              />
          </Grid>
        </Grid>
      </main>
    </div>
  );
}
