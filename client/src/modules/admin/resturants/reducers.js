import actions from "./actions";

const reducer= (state, action)=>{
    switch (action.type) {
    case actions.SET_RESTURANTS:
        return {...state, items:action.data}
    case actions.REGRESH_DATA:
        return {...state, refresh: action.data}
    case actions.SET_CART_DATA:
        return {...state, cartItems: action.data}
    case actions.SET_REVIEWS:
        return {...state, reviews: action.data}
    }
}
export default reducer;