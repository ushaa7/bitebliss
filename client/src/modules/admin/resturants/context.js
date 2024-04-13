import React, { createContext, useEffect, useReducer } from 'react';
import userReduce from './reducers';
import * as Service from './services';
import * as actions from './actions';
import { getUser } from '../../../utils/sessionManager';


const initialState = {
	items: [],
	cartItems: [],
	reviews : [],
	refresh: false,
	pagination: { limit: 10, start: 0, total: 0, currentPage: 1, totalPages: 0 }
}


export const RestContext = createContext(initialState);


export const ResturantContextProvider = ({ children }) => {

	const [state, dispatch] = useReducer(userReduce, initialState);

	async function getAllItems() {
		const res = await Service.getAllResturants();
		return res;
	}

	async function getById(id) {
		const res = await Service.getById(id);
		return res;
	}

	async function refreshData() {
		dispatch({ type: actions.REGRESH_DATA, data: true })
	}

	async function refreshReviews(id){
		const res = await Service.getReviewsByRest(id)
		console.log(res)
		dispatch({ type: actions.SET_REVIEWS , data: res})
	}

	async function addItem(payload) {

		const res = await Service.addItem(payload);
		return res;
	}

	async function postReview(payload) {
		const form = Object.entries(payload).reduce((d, e) => (d.append(...e), d), new FormData());
		const res = await Service.postReview(form);
		return res;
	}

	async function updateItem(payload) {
		const form = Object.entries(payload).reduce((d, e) => (d.append(...e), d), new FormData());
		const res = await Service.updateItem(form);
		return res;
	}

	async function deleteItem(id) {
		const res = await Service.deleteItem(id);
		return res;
	}

	useEffect(()=>{
		console.log(state.refresh)
		if(state.refresh == true){
			Service.getAllResturants().then(res=>{
				dispatch({ type: actions.REGRESH_DATA, data: false})
				dispatch({ type: actions.SET_RESTURANTS, data: res})
			});
		}
	},[state.refresh])

	useEffect(()=>{
		refreshData()
	},[])



	return (
		<RestContext.Provider
		value={{
			items: state.items,
			reviews : state.reviews,
			addItem,
			getAllItems,
			refreshData,
			updateItem,
			deleteItem,
			postReview,
			getById,
			refreshReviews
		}}
		>
		{children}
		</RestContext.Provider>
		)
}
