import * as bookActions from '../actiontypes/bookActions'

export const addToCart = async (bookId) => {
    const userInfo = await fetch('http://localhost:4200/user/decode', {
        method: 'GET',
        headers: {
            'authorization': `IMPORTANT ${localStorage.getItem('userToken')}`
        }
    })
    const user = await userInfo.json()
    const newCartItem = await fetch('http://localhost:4200/userInfo/cart/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: user,
            bookId: bookId
        })
    })

    return {
        type: bookActions.addToCart,
        payload: bookId
    }
}

export const removeFromCart = async (bookId) => {
    const userInfo = await fetch('http://localhost:4200/user/decode', {
        method: 'GET',
        headers: {
            'authorization': `IMPORTANT ${localStorage.getItem('userToken')}`
        }
    })
    const user = await userInfo.json()
    const deletedCartItem = await fetch('http://localhost:4200/userInfo/cart/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: user,
            bookId: bookId
        })
    })
    return {
        type: bookActions.removeFromCart,
        payload: bookId
    }
}

export const loginCartSetup = async (user) => {
    const rawBookList = await fetch('http://localhost:4200/userInfo/cart/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            const bookList = await rawBookList.json()
    const cart = bookList.map((book) => {
        return book.id
    })

    return {
        type: bookActions.newCart,
        payload: cart
    }
}