import axios from "axios";
import { RESTURANTS, REVIEWS} from "../../../constants/api";
import { getUserToken } from "../../../utils/sessionManager";

const access_token = getUserToken();

export async function getAllResturants() {
    try {
        const res = await axios.get(`${RESTURANTS}`, {headers:{'access_token':access_token}});
        return res.data;
    } catch (err) {
        console.error(err);
    }
}

export async function getById(id) {
    try {
        const res = await axios.get(`${RESTURANTS}/${id}`, {headers:{'access_token':access_token}});
        return res.data;
    } catch (err) {
        console.error(err);
    }
}

export async function getReviewsByRest(id){
    try {
        const res = await axios.get(`${REVIEWS}/getbyRestId/${id}`, {headers:{'access_token':access_token}});
        return res.data;
    } catch (err) {
        console.error(err);
    }
}

export async function postReview(payload){
	return new Promise((resolve, reject) => {
		axios.post(REVIEWS, payload,{
			headers: {
				'access_token': access_token
			}
		})
		.then((res) => {
			resolve({sucess: true, status: 200, data: res.data})
		}).catch((err)=>{
			reject({success: false, status: 400, data: err.response.data.message});
		});
    });
}

export async function addItem(payload) {
	return new Promise((resolve, reject) => {
		axios.post(RESTURANTS, payload,{
			headers: {
				'access_token': access_token
			}
		})
		.then((res) => {
			resolve({sucess: true, status: 200, data: res.data})
		}).catch((err)=>{
			reject({success: false, status: 400, data: err.response.data.message});
		});
    });
}

export async function updateItem(payload) {
	return new Promise((resolve, reject) => {
		axios.post(RESTURANTS + '/update', payload,{
			headers: {
				'access_token': access_token
			}
		})
		.then((res) => {
			resolve({sucess: true, status: 200, data: res.data})
		}).catch((err)=>{
			reject({success: false, status: 400, data: err.response.data.message});
		});
    });
}
export async function deleteItem(id) {
	return new Promise((resolve, reject) => {
		axios.delete(RESTURANTS +  `/${id}`, {
			headers: {
				'access_token': access_token
			}
		})
		.then((res) => {
			resolve({sucess: true, status: 200, data: res.data})
		}).catch((err)=>{
			reject({success: false, status: 400, data: err.response.data.message});
		});
    });
}