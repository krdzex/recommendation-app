import React from 'react';
import Book from './Book';

const Books = ({ books }) => {
    return (
        <div className="booksGrid">
            {books && books.map((book, id) => {
                return <Book bookInfo={book} key={id} />
            })}
        </div>
    );
};

export default Books;