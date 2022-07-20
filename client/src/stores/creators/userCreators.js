import * as userActions from '../actiontypes/userHandle'

export const onLogin = (user) => {
    return {
        type: userActions.userLogin,
        payload: user
     }
 }

 export const onLogout = () => {
    return {
        type: userActions.userLogout
    }
 }