import axios from 'axios';
import React, { useState } from 'react';
import PopUpRandom from './PopUpRandom';

const Header = (props) => {

    const [inputValue, setInputValue] = useState("")
    const [showPopup, setShowPopup] = useState(false);
    const [authors, setAuthors] = useState([]);

    const header = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    const key = "AIzaSyBO_AKUBWqUa8a_0w0_0SYT0Apz32TSFnY"
    const url = "https://www.googleapis.com/books/v1/volumes"
    const params = {
        q: inputValue,
        key: key
    }

    const [error, setError] = useState(false);
    const [recommandedBook, setRecommandedBook] = useState(false);
    const [recommandedBookInfo, setRecommandedBookInfo] = useState()

    const onSubmitHandler = (e) => {
        e.preventDefault()
        axios.get(url, { params }, { header }).then(response => doOnCorrectApi(response)).catch(reason => console.log(reason))
    }
    const onChangeInput = (e) => {
        setInputValue(e.target.value)
    }

    const doOnCorrectApi = (data) => {
        if (data.data.totalItems === 0) {
            props.getAllBooks([]);
            setError(true)
            setRecommandedBook(false)

        } else {
            props.getAllBooks(data.data.items);
            setError(false);
            setRecommandedBook(true)
            setAuthors(data.data.items[0].volumeInfo.authors)
        }
    }
    const showRecommandedBook = () => {
        let randomNumber = Math.floor(Math.random() * (10 - 1) + 1)
        setRecommandedBookInfo(props.books[randomNumber]);
        setAuthors(props.books[randomNumber].volumeInfo.authors)
        setShowPopup(true);
    }
    const closePopUp = () => {
        setShowPopup(false);
    }
    return (
        <div className="headerWrapper">
            <h2>Book Recommender</h2>
            <p>which book should you read?</p>
            <form onSubmit={onSubmitHandler} style={{ width: "100%",display: "flex", justifyContent: "center"}}>
                <input className="inputField" placeholder="Enter the book title" value={inputValue} onChange={onChangeInput}></input>
                <button type="submit" className="buttonSubmit">🔍</button>
            </form>
            <div className="textUnderInput" onClick={recommandedBook ? showRecommandedBook : undefined} style={error ? { backgroundColor: "red" } : recommandedBook ? { backgroundColor: "white", color: "#1e90ff", border: "3px solid #1e90ff", cursor: "pointer" } : {}}>
                {error ? <p>Sorry we dont have book with that input</p> : recommandedBook ? <p>Press to see our recommanded Book for you</p> : <p>Search the books and chose recommanded</p>}
            </div>
            {showPopup && (
                <PopUpRandom recommandedBookInfo={recommandedBookInfo} authors={authors} closePopUp={closePopUp} />
            )}
        </div>
    );
};

export default Header;