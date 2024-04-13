import axios from 'axios';
import { USER, AUTH, ROLES } from '../../constants/api';
import { logoutUser, getUserToken, saveUser, saveUserPermissions, saveUserToken } from '../../utils/sessionManager';

const access_token = getUserToken();
export async function login(payload) {
    return new Promise((resolve, reject) => {
        axios.post(USER + '/login', payload)
            .then((res) => {
                console.log(res)
                saveUser(res.data.user);
                saveUserToken(res.data.token);
                saveUserPermissions(res.data.permissions);
                resolve({ sucess: true, status: 200, data: res.data })
            }).catch((err) => {
                reject(err);
            });
    });
}
export async function logout() {
    logoutUser();
}
export async function verifyToken(token) {
    try {
        const res = await axios.get(`${AUTH}/${token}`);
        return res;
    } catch (err) {
        console.error(err);
    }
}

export async function addUser(payload) {
    return new Promise((resolve, reject) => {
        axios.post(USER, payload)
            .then((res) => {
                resolve({ sucess: true, status: 200, data: res.data })
            }).catch((err) => {
                reject(err);
            });
    });
}

export async function getAllUser() {
    try {
        const res = await axios.get(USER, {
            headers: {
                'access_token': access_token
            }
        });
        return res.data;
    } catch (err) {
        console.error(err);
    }
}

export async function forgotPassword(payload) {
    try {
        return new Promise((resolve, reject) => {
            axios.post(USER + '/forgotPassword', payload)
            .then((res) => {
                console.log(res)
                resolve({ sucess: true, status: 200, data: res.data })
            }).catch((err) => {
                reject(err);
            });
        });
    } catch (err) {
        console.error(err);
    }
}

export async function changePassword(payload) {
    try {
        return new Promise((resolve, reject) => {
            axios.post(USER + '/changePassword', payload)
            .then((res) => {
                console.log(res)
                resolve({ sucess: true, status: 200, data: res.data })
            }).catch((err) => {
                reject(err);
            });
        });
    } catch (err) {
        console.error(err);
    }
}

export async function approveUser(id) {
    try {
        const res = await axios.post(USER + `/validate/${id}`, {}, {
            headers: {
                'access_token': access_token
            }
        });
        return res.data;
    } catch (err) {
        console.error(err);
    }
}

export async function updateUser(id, data) {
    try {
        const res = await axios.post(USER + `/${id}/update`, data, {
            headers: {
                'access_token': access_token
            }
        });
        return res.data;
    } catch (err) {
        console.error(err);
    }
}

export async function getAllRoles() {
    try {
        const res = await axios.get(ROLES);
        console.log(res.data)
        return res.data;
    } catch (err) {
        return err;
    }
}