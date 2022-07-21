import * as userActions from '../actiontypes/userHandle'

export const onLogin = (user) => {

    return async (dispatch) => {
        const sentForm = await fetch('http://localhost:4200/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        const jsonUser = await sentForm.json()
        if(jsonUser.success) {
            dispatch({type: userActions.userLogin, payload: {"userId":jsonUser.userId, "username": jsonUser.username}})
            
        }
    }
 }

 export const onLogout = () => {
    return {
        type: userActions.userLogout
    }
 }