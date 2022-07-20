import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
import { userLogout } from '../stores/actiontypes/userHandle'
import { useEffect, useState } from 'react'


function Header (props) {
    const [displayElements, setDisplayElements] = useState({})
    const [localInfo, setLocalInfo] = useState({cartSize: props.cart.length})

    const updateCart = () => {

    }

    const logUserOut = ()=> {
        props.logout()
    }

    useEffect(() => {
        setUserElements(props.isAuthenticated)
    }, [props.isAuthenticated, props.cart.length])

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

        const loggedOutElements = (
            <div>
                <div className="navButton"><NavLink to='/registration'>Register</NavLink></div>
                <div className="navButton"><NavLink to='/login'>Login</NavLink></div>
            </div>
        )

        if (userState) {
            setDisplayElements({
                ...displayElements,
                userElements: loggedinElements
            })
        } else {
            setDisplayElements({
                ...displayElements,
                userElements: loggedOutElements
            })
        }
    }

    return (
        <div>
            <div className="navigation">
                    <h1>Book Barn</h1>
                    <div><NavLink to = "/">Home</NavLink></div>
                    <div><NavLink to = "/add-book">Add Book</NavLink></div>
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
        isAuthenticated: state.isAuthenticated,
        username: state.username,
        cart: state.booksInCart
    }
}

const mapDispatch = (dispatch) => {
    return {
        logout: (user) => (dispatch({type: userLogout, payload: ""}))
    }

}

export default connect(mapStateToProps, mapDispatch)(Header);