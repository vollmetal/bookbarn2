import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addToCart } from "../stores/actiontypes/bookActions";



function MainPage (props) {
    const [bookFilter, setBookFilter] = useState({view: "all",sortGenre: "", sortName: "", sortAuthor: "", displayBooks: [], tempCart: []})


    useEffect(() => {fetchBooks()}, [])

    const fetchBooks = async () => {
        let bookList = []

        const rawBookList = await fetch('http://localhost:4200/books')
            bookList = await rawBookList.json()

        let filteredBooks = await bookList.filter((book) => {
            return book.genre.includes(bookFilter.sortGenre) && book.title.includes(bookFilter.sortName) && book.author.includes(bookFilter.sortAuthor)
        })

        let shownBookElements = filteredBooks.map((book, index) => {
            let bookName = `${book.title}-${index}`;
            console.log(book.id)
            return (
                <li key={bookName} className="bookItem">
                    <b className="bookTitle">{book.title}</b>
                    <i className="bookYear">{book.year}</i>
                    <div className="bookDetails">
                        <span className="bookDetailSides">By: {book.author}</span>
                        <span className="bookDetailSides">{book.publisher}</span>
                    </div>
                    <img className="bookImage" src={book.imageURL} alt=""></img>
                    <button className="addToCartButton" onClick={()=> {addToCart(book.id)}}>Add to cart</button>
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
        fetchBooks()

    }

    const addToCart = (bookId) => {
        props.addToCart(bookId)
    }

    const changeBookFilter = (e) => {
        setBookFilter({
            ...bookFilter,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
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
        userId: state.userId,
        isAuthenticated: state.isAuthenticated
    }
}

const mapDispatch = (dispatch) => {
    return {
        addToCart: (bookId) => (dispatch({type: addToCart, payload: bookId}))
    }

}

export default connect(mapStateToProps, mapDispatch)(MainPage);