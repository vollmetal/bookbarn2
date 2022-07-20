import * as bookActions from "../actiontypes/bookActions";

const initialState = {
    booksInCart: []
}

const bookReducer = (state = initialState, action) => {

    switch (action.type) {
        case bookActions.addToCart:
            return {
                ...state,
                booksInCart: state.booksInCart.concat(action.payload)
            };
            case bookActions.removeFromCart:
                return {
                    ...state,
                    booksInCart: state.booksInCart.filter((item) => {return item != action.payload})
                };

        default:
            break;
    };

    return state;

}

export default bookReducer;