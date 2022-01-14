
import DashboardIcon from '@mui/icons-material/Dashboard';
import ClassIcon from '@mui/icons-material/Class';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export const menuItems = [
    {
        icon: DashboardIcon,
        label: 'Dashboard',
        href: '/superadmin/dashboard'
    },
    {
        icon: FitnessCenterIcon,
        label: 'Clubs',
        href: '/superadmin/clubs'
    },
    {
        icon: ClassIcon,
        label: 'Classes',
        href: '/superadmin/classes'
    },
    {
        icon: NewspaperIcon,
        label: 'Newsletters',
        href: '/superadmin/newsletters'
    },
    {
        icon: OndemandVideoIcon,
        label: 'Videos',
        href: '/superadmin/videos'
    },
    {
        icon: SupervisorAccountIcon,
        label: 'Admins',
        href: '/superadmin/admins'
    },
    {
        icon: ManageAccountsIcon,
        label: 'Account',
        href: '/superadmin/profile'
    }
];