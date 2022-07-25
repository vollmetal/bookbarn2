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
            localStorage.setItem('userToken', jsonUser.token)
            dispatch({type: userActions.userLogin, payload: {"username": jsonUser.username}})
            
        }
    }
 }

 export const onLogout = () => {
    localStorage.removeItem('userToken')
    return {
        type: userActions.userLogout
    }
 }