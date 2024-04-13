//used in this file to merge merge_path and submerge_path
function merge_path(base, submerge_path){
    return `${base}${submerge_path}`
}

export const ROOTS={
    auth     :'/auth',
    app      :'/app',
    admin    :'/admin',
    error    :'/error'
};

export const PATH_HOME={
    app: ROOTS.app
};

export const PATH_PAGE = {
    auth: {
      login           : merge_path(ROOTS.auth, '/login'),
      signup          : merge_path(ROOTS.auth, '/signup'),
      waitForApprove  : merge_path(ROOTS.auth, '/waitforapprove'),
      resetPassword   : merge_path(ROOTS.auth, '/reset-password'),
      forgotPasswordChangePassword : merge_path(ROOTS.auth, '/forgot/:token'),
    },
    comingSoon: '/coming-soon'
  };
  
  export const PATH_APP = {
    root: ROOTS.app,
    app:
    {
      analytics       : merge_path(ROOTS.app, '/analytics'),
      contact         : merge_path(ROOTS.app, '/contact'),
      inventory       : merge_path(ROOTS.app, '/items'),
      profile         : merge_path(ROOTS.app, '/profile'),
      reservations    : merge_path(ROOTS.app, '/reservations'),
      resturants      : merge_path(ROOTS.app, '/resturants'),
      customers       : merge_path(ROOTS.app, '/customers'),
      customer_details: merge_path(ROOTS.app, '/customers/:id'),
      resturant_detail:merge_path(ROOTS.app, '/resturants/:id'),
      item_detail     : merge_path(ROOTS.app, '/items/:id'),
    },
    admin: 
    {
      inventory    :merge_path(ROOTS.admin, '/items/'),
      resturants   :merge_path(ROOTS.admin, '/resturants'),
      item_add     :merge_path(ROOTS.admin, '/items/add'),
      item_detail  :merge_path(ROOTS.admin, '/items/'),
      dashboard    :merge_path(ROOTS.admin, '/dashboard'),
      staffs       :merge_path(ROOTS.admin, '/staffs'),
      staff_details:merge_path(ROOTS.admin, '/staff/:id'),
      add          :merge_path(ROOTS.admin, '/items/add'),
    },
  };