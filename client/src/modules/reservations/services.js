import axios from "axios";
import { RESERVATIONS } from "../../constants/api";
import { getUserToken } from "../../utils/sessionManager";

const access_token = getUserToken();

//TODO: Add khalti payment

export async function initiateKhaltiPayment(amount){
	return new Promise((resolve, reject) => {

        axios.post(`https://a.khalti.com/api/v2/epayment/initiate/`, { 
        		"return_url": "http://localhost:3000/app/resturants",
        		"website_url": "http://localhost:3000/app/resturants",
        		"amount": amount,
        		"purchase_order_id": "Order01",
        		"purchase_order_name": "test",
        },{headers:{'Authorization':'key 3e6493a354bb4ff89c69d9bb97bd4923'}})
		.then((res) => {
			resolve({sucess: true, status: 200, data: res.data})
		}).catch((err)=>{
			console.log(err)
			reject({success: false, status: 400, data: err});
		});
	});
}

export async function getAllReservations() {
    try {
        const res = await axios.get(`${RESERVATIONS}`, {headers:{'access_token':access_token}});
        return res.data;
    } catch (err) {
        console.error(err);
    }
}
export async function addItem(payload) {
	return new Promise((resolve, reject) => {
		axios.post(RESERVATIONS, payload,{
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
		axios.post(RESERVATIONS+ '/update', payload,{
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
		axios.delete(RESERVATIONS+  `/${id}`, {
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