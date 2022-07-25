import { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as bookCreators from '../stores/creators/bookCreators'



function CartPage (props) {
    const [bookFilter, setBookFilter] = useState({view: "all",sortGenre: "", sortName: "", sortAuthor: "", displayBooks: [], tempCart: []})


    useEffect(() => {fetchBooks()}, [props])

    const fetchBooks = async () => {
        let bookList = []

        const rawBookList = await fetch('http://localhost:4200/userInfo/cart/', {
            method: 'GET',
            headers: {
                'authorization': `IMPORTANT ${localStorage.getItem('userToken')}`
            }
        })
            bookList = await rawBookList.json()

        let filteredBooks = await bookList.filter((book) => {
            return book.genre.toLowerCase().includes(bookFilter.sortGenre.toLowerCase()) && book.title.toLowerCase().includes(bookFilter.sortName.toLowerCase()) && book.author.toLowerCase().includes(bookFilter.sortAuthor.toLowerCase())
        })

        let shownBookElements = await filteredBooks.map((book, index) => {
            let bookName = `${book.title}-${index}`;
            
            
            return (
                <li key={bookName} className="bookItem">
                    <b className="bookTitle">{book.title}</b>
                    <i className="bookYear">{book.year}</i>
                    <label>genre: {book.genre}</label>
                    <div className="bookDetails">
                        <span className="bookDetailSides">By: {book.author}</span>
                        <span className="bookDetailSides">{book.publisher}</span>
                    </div>
                    <img className="bookImage" src={book.imageURL} alt=""></img>
                    <button className="addToCartButton" onClick={()=> {removeFromCart(book.id)}}>Remove from cart</button>
                    <button className="deleteButton" name={book.id} onClick={deleteBook} >Delete</button>
                </li>
            )
        })
        console.log(shownBookElements)

        setBookFilter({
            ...bookFilter,
            displayBooks: shownBookElements
        })
        
      }

      
    const deleteBook = async (e) => {
        const deleteAction = await fetch('http://localhost:4200/books/delete', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"id": e.target.name})
        })
        const response = await deleteAction.json()
        if(response.success) {
            fetchBooks()
        }
        

    }

    const addToCart = (bookId) => {
        if(props.cart.includes(bookId)) {

        } else {
            props.addToCart(bookId)
        }
        
    }

    const removeFromCart = (bookId) => {
        if(props.cart.includes(bookId)) {
            props.removeFromCart(bookId)
        } else {

        }
        
    }

    const changeBookFilter = (e) => {
        setBookFilter({
            ...bookFilter,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            <h1>{props.state}</h1>
            <div className="searchBars">
                <div className="searchBarInput">
                    <span>Search by genre: </span>
                    <input name="sortGenre" onChange={changeBookFilter} type="text"/>
                </div>
                <div className="searchBarInput">
                    <span>Search by author: </span>
                    <input name="sortAuthor" onChange={changeBookFilter} type="text"/>
                </div>
                <div className="searchBarInput">
                    <span>Search by title: </span>
                    <input name="sortName" onChange={changeBookFilter} type="text"/>
                </div>
                <button onClick={fetchBooks}>Search</button>
            </div>
            <ul className="bookList">
                {bookFilter.displayBooks}
            </ul>
        </div>

        
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.userReducer.userId,
        isAuthenticated: state.userReducer.isAuthenticated,
        cart: state.bookReducer.booksInCart
    }
}

const mapDispatch = (dispatch) => {
    return {
        addToCart: (bookId) => (dispatch(bookCreators.addToCart(bookId))),
        removeFromCart: (bookId) => (dispatch(bookCreators.removeFromCart(bookId)))
    }

}

export default connect(mapStateToProps, mapDispatch)(CartPage);