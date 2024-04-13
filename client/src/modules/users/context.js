import React, { createContext, useEffect, useReducer } from 'react';
import userReduce from './reducers';
import * as Service from './services';
import API from '../../constants/api';
import axios from 'axios';
import { getUserToken, getUser } from '../../utils/sessionManager';
import actions from './actions';
const access_token = getUserToken();
const USER = API.USER;

const initialState = {
  user_info: {},
  list: [],
  refresh: false
};

export const UserContext = createContext(initialState);
export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReduce, initialState);

  async function userLogin(payload) {
     var form = new FormData();
     form.append("email", payload.email);
     form.append("password", payload.password);
     const ret = await Service.login(form);
     dispatch({type: actions.SET_USER, data: ret.data});
     return ret;
  }

  function logout() {
    Service.logout();
  }
  async function getAllRoles(){
    return Service.getAllRoles();
  }
  async function verifyToken(token) {
    return new Promise((resolve, reject) => {
      Service.verifyToken(token)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async function addUser(payload) {
     var form = new FormData();
     form.append("email", payload.email);
     form.append("password", payload.password);
     form.append("username", payload.username);
     form.append("role", payload.role);
    return await Service.addUser(form);
  }


  async function getAllUser() {
    try{
      const res = await Service.getAllUser();
      dispatch({type: actions.SET_LIST, data: res} )
    }catch(err){
      console.log(err)
    }
  }

  async function refreshData(){
      dispatch({type: actions.REFRESH_DATA})
  }
  async function approveUser(id){
    try{
      await Service.approveUser(id);
    }catch(err){
      throw err;
    }
  }

  async function forgotPassword(email){
    try{
     var form = new FormData();
     form.append("email", email);
     const ret = await Service.forgotPassword(form);
     return ret;
    }catch(err){
      throw err;
    }
  }

  async function changePassword(newpassword, cpassword, token){
    try{
     var form = new FormData();
     form.append("password", newpassword);
     form.append("cpassword", cpassword);
     form.append("token", token);
     const ret = await Service.changePassword(form);
     return ret;
    }catch(err){
      throw err;
    }
  }

  async function updateUser(id, data){
    try{
      await Service.updateUser(id, data);
      dispatch({type: actions.REFRESH_DATA} )
    }catch(err){
      throw err;
    }
  }

  useEffect(() => {
    if(state.refresh === true){
      getAllUser().then(()=>{
        dispatch({type: actions.REFRESH_DATA, data : false})
      });
      const user_data = getUser();
        dispatch({type: actions.SET_USER, data : user_data})
    }
  },[state.refresh])

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        list: state.list,
        user_info : state.user_info,
        userLogin,
        verifyToken,
        getAllUser,
        refreshData,
        dispatch,
        addUser,
        logout,
        getAllRoles,
        approveUser,
        updateUser,
        forgotPassword,
        changePassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
