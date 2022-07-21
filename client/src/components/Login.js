import { useState } from "react";
import { connect } from 'react-redux'
import { useNavigate } from "react-router-dom";
import * as userCreators from '../stores/creators/userCreators'



function Login (props) {
    const [tempUser, setTempUser] = useState({})
    const navigate = useNavigate()

    const onInput = (e) => {
        setTempUser({
            ...tempUser,
            [e.target.name]: e.target.value
        })
    }

    const loginUser = async () => {
        await props.onLogin(tempUser)
        navigate("/")
        
    }

    return (
        <div className='menuPage'>
            <h1>Please Login</h1>
            <div className="menuItem">
                <label>email</label>
                <input type="text" name="email" onChange={onInput}/>
            </div>
            <div className="menuItem">
                <label>password</label>
                <input type="password" name="password" onChange={onInput}/>
            </div>
            <button onClick={loginUser}>Login</button>

        </div>
    )
}

const mapDispatch = (dispatch) => {
    return {
        onLogin: (user) => (dispatch(userCreators.onLogin(user)))
    }

}

export default connect(null, mapDispatch)(Login);