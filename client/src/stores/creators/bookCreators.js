import * as bookActions from '../actiontypes/bookActions'

export const addToCart = (bookId) => {
    return {
        type: bookActions.addToCart, 
        payload: bookId
    }
}

export const removeFromCart = (bookId) => {
    return {
        type: bookActions.removeFromCart, 
        payload: bookId
    }
}