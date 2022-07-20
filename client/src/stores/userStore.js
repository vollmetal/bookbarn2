import * as loginActions from "./actiontypes/userHandle";
import * as bookActions from "./actiontypes/bookActions";

const initialState = {
    isAuthenticated: false,
    userId: -1,
    username: "",
    booksInCart: [0]
}

const userStore = (state = initialState, action) => {

    switch (action.type) {
        case loginActions.userLogin:
            return {
                ...state,
                userId: action.payload.userId,
                username: action.payload.username,
                isAuthenticated: true
            };
        case loginActions.userLogout:
            return {
                ...state,
                userId: -1,
                username: "",
                isAuthenticated: false
            };
        case bookActions.addToCart:
            return {
                ...state,
                booksInCart: state.booksInCart.concat(action.payload)
            };

        default:
            break;
    };

    return state;

}

export default userStore;