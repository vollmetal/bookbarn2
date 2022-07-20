import { useState } from "react";
import { userLogin } from "../stores/actiontypes/userHandle";
import { connect } from 'react-redux'



function Register (props) {
    const [tempUser, setTempUser] = useState({})

    const onInput = (e) => {
        setTempUser({
            ...tempUser,
            [e.target.name]: e.target.value
        })
    }

    const registerUser = async () => {
        const sentForm = await fetch('http://localhost:4200/user/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tempUser)
        })
        const jsonUser = await sentForm.json()
        if(jsonUser.success) {
            props.onLogin({"userId":jsonUser.userId, "username": jsonUser.username})
        }
        
    }

    return (
        <div>
            <h1>Register a new user</h1>
            <div>
                <label>username: </label>
                <input type="text" name="username" onChange={onInput}/>
            </div>
            <div>
                <label>email: </label>
                <input type="email" name="email" onChange={onInput}/>
            </div>
            <div>
                <label>password: </label>
                <input type="password" name="password" onChange={onInput}/>
            </div>
            <button onClick={registerUser}>Login</button>

        </div>
    )
}

const mapDispatch = (dispatch) => {
    return {
        onLogin: (user) => (dispatch({type: userLogin, payload: user}))
    }

}

export default connect(null, mapDispatch)(Register);