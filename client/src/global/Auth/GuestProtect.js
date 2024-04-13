//The guestprotect dosen't let the valid register go to it, like login

import React from 'react';
import PropTypes from 'prop-types';
import { PATH_APP } from '../../routes/paths';
import { Navigate} from 'react-router-dom';

import { getUserToken } from '../../utils/sessionManager';
import { validateAccessToken } from '../../utils';

const access_token = getUserToken();

// ----------------------------------------------------------------------

GuestProtect.propTypes = {
  children: PropTypes.node
};

function GuestProtect({ children }) {
  let isAuthenticated = false;
  if (access_token) isAuthenticated = validateAccessToken(access_token);


  const { isLoading } = {
    isLoading: false
  };

  if (isLoading) {
    return <div> Loading </div>;
  }

  if (isAuthenticated) {
    return <Navigate to={PATH_APP.root} />;
  }

  return <>{children}</>;
}

export default GuestProtect;
