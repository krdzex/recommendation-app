import React, { useState } from 'react';
import BookDetails from './BookDetails';

const Book = ({ bookInfo }) => {

    const [showDetailsInfo, setShowDetailsInfo] = useState(false)

    const showDetails = () => {
        setShowDetailsInfo(true)
    }

    const closeDetails = () => {
        setShowDetailsInfo(false);
    }

    const authors = bookInfo.volumeInfo.authors
    return (
        <div className="bookWrapper">
            <div className="bookInfo">
                {bookInfo.volumeInfo.imageLinks ? <img src={bookInfo.volumeInfo.imageLinks.thumbnail} alt="bookImage" style={{ width: "70%", height: "300px" }}></img> : <img src="https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg" alt="noImage" style={{ width: "70%", height: "300px" }}></img>}
                <div className="bookTitle">{bookInfo.volumeInfo.title}</div>
                <div className="authors">{authors && authors.toString()}</div>
                <div className="detailsButton" onClick={showDetails}>
                    Details
                </div>
                {showDetailsInfo && (
                    <BookDetails bookInfo={bookInfo} closeDetails={closeDetails} authors={authors}/>
                )}
            </div>
        </div>
    );
};

export default Book;
