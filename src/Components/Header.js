import axios from 'axios';
import React, { useState } from 'react';

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
            setRecommandedBookInfo(data.data.items[0]);
            setAuthors(data.data.items[0].volumeInfo.authors)
        }
    }
    console.log(recommandedBookInfo)
    const showRecommandedBook = () => {
        setShowPopup(true);
    }
    const closePopUp = () => {
        setShowPopup(false);
    }
    return (
        <div className="headerWrapper">
            <h2>Book Recommender</h2>
            <p>which book should you read?</p>
            <form onSubmit={onSubmitHandler} style={{ width: "100%" }}>
                <input className="inputField" placeholder="Enter the book title" value={inputValue} onChange={onChangeInput}></input>
                <button type="submit" className="buttonSubmit">🔍</button>
            </form>
            <div className="textUnderInput" onClick={recommandedBook ? showRecommandedBook : undefined} style={error ? { backgroundColor: "red" } : recommandedBook ? { backgroundColor: "white", color: "#1e90ff", border: "3px solid #1e90ff", cursor: "pointer" } : {}}>
                {error ? <p>Sorry we dont have book with that input</p> : recommandedBook ? <p>Press to see our recommanded Book for you</p> : <p>Search the books and chose recommanded</p>}
            </div>
            {showPopup && (
                <div className="popUp">
                    <div className="recommandedBookCard">
                        <div className="recommandedBookCardInfo">
                            <div style={{ margin: "10px" }}>Recommanded book is:</div>
                            {recommandedBookInfo.volumeInfo.imageLinks ? <img src={recommandedBookInfo.volumeInfo.imageLinks.thumbnail} alt="bookImage" style={{ width: "70%", height: "300px" }}></img> : <img src="https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg" alt="noImage" style={{ width: "70%", height: "300px" }}></img>}
                            <div className="bookTitle">{recommandedBookInfo.volumeInfo.title}</div>
                            <div>{authors && authors.toString()}</div>
                            {recommandedBookInfo.volumeInfo.pageCount ? <div style={{ margin: "10px 0px" }}><b>Page count: </b>{recommandedBookInfo.volumeInfo.pageCount}</div> : <p>There is no page count</p>}
                            <a href={recommandedBookInfo.volumeInfo.previewLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>Read this book online</a>
                            <div className="closeButton" onClick={closePopUp}>Close</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;