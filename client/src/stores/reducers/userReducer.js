import * as loginActions from "../actiontypes/userHandle";

const initialState = {
    isAuthenticated: false,
    username: ""
}

const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case loginActions.userLogin:
            return {
                ...state,
                username: action.payload.username,
                isAuthenticated: true
            };
        case loginActions.userLogout:
            return {
                ...state,username: "",
                isAuthenticated: false
            };
        
        default:
            break;
    };

    return state;

}

export default userReducer;