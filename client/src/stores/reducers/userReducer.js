import * as loginActions from "../actiontypes/userHandle";

const initialState = {
    isAuthenticated: false,
    userId: -1,
    username: ""
}

const userReducer = (state = initialState, action) => {

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
        
        default:
            break;
    };

    return state;

}

export default userReducer;