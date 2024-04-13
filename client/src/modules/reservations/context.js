import React, { createContext, useEffect, useReducer } from 'react';
import userReduce from './reducers';
import * as Service from './services';
import * as actions from './actions';
import { getUser } from '../../utils/sessionManager';

const initialState = {
	items: [],
	refresh: false,
	pagination: { limit: 10, start: 0, total: 0, currentPage: 1, totalPages: 0 }
}

export const ResvContext = createContext(initialState);

export const ReservationContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(userReduce, initialState);

	async function getAllItems() {
		Service.getAllReservations().then((res)=>{
			dispatch({ type: actions.SET_RESERVATIONS, data: res})
			dispatch({ type: actions.REGRESH_DATA, data: false})
		});
	}

	async function refreshData() {
		dispatch({ type: actions.REGRESH_DATA, data: true })
	}

	async function addItem(payload) {
		const form = Object.entries(payload).reduce((d, e) => (d.append(...e), d), new FormData());
		const res = await Service.addItem(form);
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

	async function initiateKhaltiPayment(amount){
		const res = await Service.initiateKhaltiPayment(amount);
		return res;
	}

	useEffect(() => {
		if(state.refresh === true){
			getAllItems();
		}
	},[state.refresh])

	useEffect(()=>{
		refreshData();
	},[])


	return (
		<ResvContext.Provider
		value={{
			items: state.items,
			addItem,
			getAllItems,
			refreshData,
			updateItem,
			deleteItem,
			initiateKhaltiPayment,
		}}
		>
		{children}
		</ResvContext.Provider>
		)
}