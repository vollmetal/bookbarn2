import { useState } from "react";
import { userLogin } from "../stores/actiontypes/userHandle";
import { connect } from 'react-redux'



function AddBook (props) {
    const [tempUser, setTempUser] = useState({userID: props.userId, imageURL: ""})

    const onInput = (e) => {
        setTempUser({
            ...tempUser,
            [e.target.name]: e.target.value
        })
    }

    const loginUser = async () => {
        const sentForm = await fetch('http://localhost:4200/books/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tempUser)
        })
        const jsonUser = await sentForm.json()
        if(jsonUser.success) {
            props.onLogin({"userId":jsonUser.userId, "username": jsonUser.username})
        }
        
    }

    return (
        <div>
            <h1>Add a New Book</h1>
            <div>
                <label>title: </label>
                <input type="text" name="title" onChange={onInput}/>
            </div>
            <div>
                <label>year: </label>
                <input type="number" name="year" onChange={onInput}/>
            </div>
            <div>
                <label>author: </label>
                <input type="text" name="author" onChange={onInput}/>
            </div>
            <div>
                <label>publisher: </label>
                <input type="text" name="publisher" onChange={onInput}/>
            </div>
            <div>
                <label>genre: </label>
                <input type="text" name="genre" onChange={onInput}/>
            </div>
            <div>
                <label>book cover url: </label>
                <input type="text" name="imageURL" onChange={onInput}/>
            </div>
            <button onClick={loginUser}>Login</button>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.userId,
        isAuthenticated: state.isAuthenticated
    }
}

export default connect(mapStateToProps)(AddBook);