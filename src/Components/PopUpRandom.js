import React from 'react';

const PopUpRandom = ({recommandedBookInfo,authors,closePopUp}) => {
    return (
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
    );
};

export default PopUpRandom;