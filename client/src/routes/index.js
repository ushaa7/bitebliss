import {Fragment, lazy, Suspense} from 'react';
import GuestProtect from '../global/Auth/GuestProtect';
import {Navigate, useRoutes } from 'react-router-dom';
import {PATH_PAGE, PATH_APP} from './paths';
import AuthProtect from '../global/AuthProtect';
import LoadingScreen from '../components/LoadingScreen';
import DashBoardLayout from '../layouts';


export default function Router(){
  return useRoutes([
    {path: '', 
    element: (

        <AuthProtect>
          <DashBoardLayout/>
        </AuthProtect>

    ),
    children:[
    	{path: '', element: <Home/>},
    	]
	},
       {
    element: (
      <AuthProtect>
      <DashBoardLayout/>
      </AuthProtect>
      ),
      path: 'app',
      children:[
        {element: <Navigate to ="/" replace/>},
        {path: '', element: <Home/>},
        {path: 'reservations', element: <Reservations/>},
        {path: 'resturants', element: <UserResturants/>},
        {path: PATH_APP.app.resturant_detail, element: <ResturantDetail/>},
        {path: PATH_APP.app.profile, element: <UserProfile/>},
        {path: PATH_APP.app.contact, element: <ContactPage/>},
        //{path: 'items', element: <Inventory/>},
        //{path: 'analytics', element: <Analytics/>},
      ]
  },
  {
  	path : 'admin',
  	element: (
  		<AuthProtect>
  		<DashBoardLayout/>
  		</AuthProtect>
  		),
  	children:[
  		{element: <Navigate to ="/admin" replace/>},
  		{path: '', element: <Admin/>},
        {path: 'resturants', element: <Resturants/>},
    		//{path: 'items/add' , element: <AdminInventory/>},
  		]

  },
  	/*
    {
      path: 'app',
      element:(
        <AuthProtect>
          <DashBoardLayout/>
        </AuthProtect>
      ),
      children:[
        {path: '', element: <Home/>},
        {path: 'items', element: <Inventory/>},
        {path: 'analytics', element: <Analytics/>},
      ]
    },
    {
      path: 'admin',
      element:(
        <AuthProtect>
          <DashBoardLayout/>
        </AuthProtect>
      ),
      children:[
        {element: <Navigate to ="/admin" replace/>},
        {path: '', element: <Admin/>},
        {path: PATH_APP.admin.item_add , element: <AddItems/>},
        {path: 'invoices', element: <Invoices/>},
        {path: 'items/add' , element: <AdminInventory/>},
      ]
    },
    */
    {
      path:'',
      children:[
        { path: PATH_PAGE.auth.login, element:<Auth/>},
        { path: '/404', element:<Page404View/>},
        { path: PATH_PAGE.auth.waitForApprove, element:<WaitForApprove/>},
        { path: PATH_PAGE.auth.forgotPasswordChangePassword, element:<ForgotPasswordChangePassword />},
      ]
    }
  ])
}


const Loadable = (Component) => (props) => {

  return (
    <Suspense
      fallback={
        <LoadingScreen
        sx={{
          ...({
            top: 0,
            left: 0,
            width: 1,
            zIndex: 9999,
            position: 'fixed',
          })
        }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};



const Admin = Loadable(lazy(()=>import('../modules/admin')));
const Resturants = Loadable(lazy(()=>import('../modules/admin/resturants')));
const UserResturants= Loadable(lazy(()=>import('../modules/users/resturants')));
const ResturantDetail= Loadable(lazy(()=>import('../modules/users/resturants/detail')));
const Reservations = Loadable(lazy(()=>import('../modules/reservations')));
const Auth = Loadable(lazy(()=>import('../views/auth/index')))
const Page404View   = Loadable(lazy(()=>import('../views/misc/page404')));
const Home = Loadable(lazy(()=>import('../home')));
const WaitForApprove= Loadable(lazy(()=>import('../views/misc/waitForApprove')));
const ContactPage = Loadable(lazy(()=>import('../home/contact')));
const UserProfile = Loadable(lazy(()=>import('../modules/users/')));
const ForgotPasswordChangePassword= Loadable(lazy(()=>import('../views/auth/forgotPasswordChangePassword')));

