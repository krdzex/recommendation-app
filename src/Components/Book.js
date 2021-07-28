import React from 'react';

const Book = ({ bookInfo }) => {

    const authors = bookInfo.volumeInfo.authors
    return (
        <div className="bookWrapper">
            <div className="bookInfo">
                {bookInfo.volumeInfo.imageLinks ? <img src={bookInfo.volumeInfo.imageLinks.thumbnail} alt="bookImage" style={{ width: "70%", height: "300px" }}></img> : <img src="https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg" alt="noImage" style={{ width: "70%", height: "300px" }}></img>}
                <div className="bookTitle">{bookInfo.volumeInfo.title}</div>
                <div>{authors && authors.toString()}</div>
                <div className="details">
                    <h3>Details</h3>
                    {bookInfo.volumeInfo.publisher ? <p><b>Publisher: </b>{bookInfo.volumeInfo.publisher}</p> : <p>There is no publisher</p>}
                    {bookInfo.volumeInfo.pageCount ? <p><b>Page count: </b>{bookInfo.volumeInfo.pageCount}</p> : <p>There is no page count</p>}
                    {bookInfo.volumeInfo.averageRating ? <p><b>Average rating: </b>{bookInfo.volumeInfo.averageRating}</p> : <p>There is no average rating</p>}
                    {bookInfo.volumeInfo.ratingsCount ? <p><b>Ratings counts: </b>{bookInfo.volumeInfo.ratingsCount}</p> : <p>There is no ratings counts</p>}
                    {bookInfo.volumeInfo.description ? <p><b>Description:<br/> </b>{bookInfo.volumeInfo.description}</p> : <p>There is no description</p>}
                </div>
            </div>
        </div>
    );
};

export default Book;
