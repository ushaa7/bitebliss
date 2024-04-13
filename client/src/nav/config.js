import AuthProtectNav from "../views/auth/AuthProtectNav"
import { ROLES } from "../constants";
import { PATH_APP, ROOTS, PATH_HOME } from "../routes/paths";
import ReceiptIcon from '@mui/icons-material/Receipt';
import InsightsIcon from '@mui/icons-material/Insights';
import HomeIcon from '@mui/icons-material/Home'; 
import AddIcon from '@mui/icons-material/Add';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
const navConfig = [
    //App
    {
        guard: AuthProtectNav,
        roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.STAFF, ROLES.USER],
        items:[
            {
                title: 'Home',
                href: ROOTS.app,
                icon: <HomeIcon/>
            },
            {
                title: 'Resturants',
                href: PATH_APP.app.resturants,
                icon: <RestaurantIcon/>
            },
            {
                title: 'Reservations',
                href: PATH_APP.app.reservations,
                icon: <ReceiptIcon/>
            }
        ]
    },
    //Admin
    {
        guard: AuthProtectNav,
        roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
        items:[
            {
                title: 'Admin',
                href: ROOTS.admin,
                icon: <SupervisorAccountIcon/>
            },
            {
                title: 'Resturants',
                href: PATH_APP.admin.resturants,
                icon: <RestaurantIcon/>
            },

        ]
    },
]
export default navConfig;