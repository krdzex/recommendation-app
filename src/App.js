import { useState } from 'react';
import './App.css';
import Books from './Components/Books';
import Header from "./Components/Header"

function App() {

  const [books, setBooks] = useState([]);

  const getAllBooks = (books) => {
    setBooks(books);
  }

  console.log(books)
  return (
    <div className="AppWrapper">
      <Header getAllBooks={getAllBooks} />
      <Books books={books} />
    </div>
  );
}

export default App;
