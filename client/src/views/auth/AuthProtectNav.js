import React from "react";
import PropTypes from 'prop-types';
import { getUser } from "../../utils/sessionManager";

AuthProtectNav.propTypes = {
    children: PropTypes.node
};

function AuthProtectNav({children, authorizedUsers}) {
   const currentUser = getUser();
   if(!currentUser){
    return <div></div>;
   }
   const {role} = currentUser; 


  if(authorizedUsers.length===0){
    return <>{children}</>;
  }
  console.log(authorizedUsers)
  if (authorizedUsers && authorizedUsers.includes(role)) {
    return <>{children}</>;
  } else {
    return <div></div>;
  }
}
export default AuthProtectNav;

