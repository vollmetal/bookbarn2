import { useState } from "react";
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom';



function AddBook(props) {
    const [newBook, setNewBook] = useState({ imageURL: "" })
    const navigate = useNavigate()

    const onInput = (e) => {
        setNewBook({
            ...newBook,
            [e.target.name]: e.target.value
        })
    }

    const addNewBook = async () => {
        const sentForm = await fetch('http://localhost:4200/books/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        })
        const jsonUser = await sentForm.json()
        if (jsonUser.success) {
            navigate("/")
        }


    }

    return (
        <div className="menuPage">
            <h1>Add a New Book</h1>
            <div className="menuItem">
                <label>title: </label>
                <input type="text" name="title" onChange={onInput} />
            </div>
            <div className="menuItem">
                <label>year: </label>
                <input type="number" name="year" onChange={onInput} />
            </div>
            <div className="newBookDetails">
                <div className="menuItem">
                    <label>author: </label>
                    <input type="text" name="author" onChange={onInput} />
                </div>
                <div className="menuItem">
                    <label>publisher: </label>
                    <input type="text" name="publisher" onChange={onInput} />
                </div>
                <div className="menuItem">
                    <label>genre: </label>
                    <input type="text" name="genre" onChange={onInput} />
                </div>
            </div>

            <div className="menuItem">
                <label>book cover url: </label>
                <input type="text" name="imageURL" onChange={onInput} />
            </div>
            <button onClick={addNewBook}>Add book</button>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.userReducer.userId,
        isAuthenticated: state.userReducer.isAuthenticated
    }
}

export default connect(mapStateToProps)(AddBook);