import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import * as userCreators from '../stores/creators/userCreators'


function Header (props) {
    const [displayElements, setDisplayElements] = useState({})

    const logUserOut = ()=> {
        props.logout()
    }

    useEffect(() => {
        setUserElements(props.isAuthenticated)
    }, [props])

    const setUserElements = async (userState) => {
        const loggedinElements = (
            <div>
                <h1>Welcome back {props.username}!</h1>
                <div className='userCart'>
                    <label>{props.cart.length} items in cart</label>
                    <button>Checkout</button>
                </div>
                <div><button onClick={logUserOut}>Logout</button></div>
            </div>
        )

        const loggedinBookElements = (
            <div>
                <div><NavLink to = "/add-book"><button>Add Book</button></NavLink></div>
                <div><NavLink to = "/usercart"><button>View Checkout</button></NavLink></div>
            </div>
        )

        const loggedOutElements = (
            <div>
                <div className="navButton"><NavLink to='/registration'><button>Register</button></NavLink></div>
                <div className="navButton"><NavLink to='/login'><button>Login</button></NavLink></div>
            </div>
        )

        if (userState) {
            setDisplayElements({
                ...displayElements,
                userElements: loggedinElements,
                bookElements: loggedinBookElements
            })
        } else {
            setDisplayElements({
                ...displayElements,
                userElements: loggedOutElements,
                bookElements: <div></div>
            })
        }
    }

    return (
        <div className='headerBody'>
            <div className="navigation">
                    <h1>Book Barn</h1>
                    <div><NavLink to = "/"><button>Home</button> </NavLink></div>
                    {displayElements.bookElements}
                    
                </div>
                <div className="userInfo">
                    <div className="userNavButtons">
                        {displayElements.userElements}
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