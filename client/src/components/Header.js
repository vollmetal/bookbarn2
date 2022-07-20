import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
import { userLogout } from '../stores/actiontypes/userHandle'


function Header (props) {

    const logUserOut = ()=> {
        props.logout()
    }

    return (
        <div>
            <div className="navigation">
                    <h1>Book Barn</h1>
                    <div><NavLink to = "/">Home</NavLink></div>
                    <div><NavLink to = "/add-book">Add Book</NavLink></div>
                </div>
                <div className="userInfo">
                    <h1>Welcome back {props.username}!</h1>
                    <div className="userNavButtons">
                        <div className="navButton"><NavLink to='/registration'>Register</NavLink></div>
                        <div className="navButton"><NavLink to='/login'>Login</NavLink></div>
                        <div><button onClick={logUserOut}>Logout</button></div>
                    </div>
                </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        username: state.username
    }
}

const mapDispatch = (dispatch) => {
    return {
        logout: (user) => (dispatch({type: userLogout, payload: ""}))
    }

}

export default connect(mapStateToProps, mapDispatch)(Header);