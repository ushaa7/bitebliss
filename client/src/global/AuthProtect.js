import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { PATH_APP, PATH_PAGE } from "../routes/paths";
import PropTypes from 'prop-types';
// pages
import Login from '../views/auth/login';
import { getUser } from '../utils/sessionManager';

import { StickyFooter } from "../nav/index"

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default function AuthGuard({ children }) {
  const user  = getUser();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!user) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Navigate to={PATH_PAGE.auth.login}/>;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return (<>{
    children
  }
  <StickyFooter/>
  </>
  );
}

