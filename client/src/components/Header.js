import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux'


function Header (props) {
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

export default connect(mapStateToProps)(Header);