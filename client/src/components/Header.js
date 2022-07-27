import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import * as userCreators from '../stores/creators/userCreators'


function Header(props) {

    const logUserOut = () => {
        props.logout()
    }
   
    return (
        <div className='headerBody'>
            <div className="navigation">
                <h1>Book Barn</h1>
                <div><NavLink to="/"><button>Home</button> </NavLink></div>
                {props.isAuthenticated ? <div>
                    <div><NavLink to="/add-book"><button>Add Book</button></NavLink></div>
                    <div><NavLink to="/usercart"><button>View Checkout</button></NavLink></div>
                </div> : null}

            </div>
            <div className="userInfo">
                <div className="userNavButtons">
                    {!props.isAuthenticated ? <div>
                        <div className="navButton"><NavLink to='/registration'><button>Register</button></NavLink></div>
                        <div className="navButton"><NavLink to='/login'><button>Login</button></NavLink></div>
                    </div> : <div>
                        <h1>Welcome back {props.username}!</h1>
                        <div className='userCart'>
                            <label>{props.cart.length} items in cart</label>
                            <button>Checkout</button>
                        </div>
                        <div><button onClick={logUserOut}>Logout</button></div>
                    </div>}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.userReducer.isAuthenticated,
        username: state.userReducer.username,
        cart: state.bookReducer.booksInCart
    }
}

const mapDispatch = (dispatch) => {
    return {
        logout: () => (dispatch(userCreators.onLogout()))
    }

}

export default connect(mapStateToProps, mapDispatch)(Header);