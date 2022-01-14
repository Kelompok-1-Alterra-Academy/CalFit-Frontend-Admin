import Link from "next/link";
import { Container } from "@mui/material";
import { useStyles } from "./MenuBarStyles";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ClassIcon from '@mui/icons-material/Class';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export const MenuBar = () => {
    const classes = useStyles();

    return (
        <Container className={classes.root}>
            <div className={classes.selectedMenu}>
                <DashboardIcon className={classes.menuIcon} />
                <Link href="/superadmin/dashboard" passHref>
                    <div>Dashboard</div>
                </Link>
            </div>
            <div className={classes.menu}>
                <FitnessCenterIcon className={classes.menuIcon} />
                <Link href="/superadmin/clubs" passHref>
                    <div>Clubs</div>
                </Link>
            </div>
            <div className={classes.menu}>
                <ClassIcon className={classes.menuIcon} />
                <Link href="/superadmin/classes" passHref>
                    <div>Classes</div>
                </Link>
            </div>
            <div className={classes.menu}>
                <NewspaperIcon className={classes.menuIcon} />
                <Link href="/superadmin/newsletters" passHref>
                    <div>Newsletters</div>
                </Link>
            </div>
            <div className={classes.menu}>
                <OndemandVideoIcon className={classes.menuIcon} />
                <Link href="/superadmin/videos" passHref>
                    <div>Videos</div>
                </Link>
            </div>
            <div className={classes.menu}>
                <SupervisorAccountIcon className={classes.menuIcon} />
                <Link href="/superadmin/admins" passHref>
                    <div>Admins</div>
                </Link>
            </div>
            <div className={classes.menu}>
                <ManageAccountsIcon className={classes.menuIcon} />
                <Link href="/superadmin/profile" passHref>
                    <div>Profile Settings</div>
                </Link>
            </div>
        </Container>
    );
};