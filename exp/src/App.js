import { useState } from 'react';
import './App.css';

function App() {
  const [books, setBooks] = useState([
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');

  // Filter books based on search term
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add a new book
  const handleAddBook = (e) => {
    e.preventDefault();
    if (bookTitle.trim() && author.trim()) {
      const newBook = {
        id: Date.now(),
        title: bookTitle.trim(),
        author: author.trim()
      };
      setBooks([...books, newBook]);
      setBookTitle('');
      setAuthor('');
    }
  };

  // Remove a book
  const handleRemoveBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-5xl md:text-6xl font-bold text-center text-gray-800 mb-12">
          Library Management System
        </h1>

        {/* Search and Add Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 transition-colors mb-6"
          />

          {/* Add Book Form */}
          <form onSubmit={handleAddBook} className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Book Title"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              className="flex-1 px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
            />
            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="flex-1 px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl transition-colors shadow-md hover:shadow-lg"
            >
              Add Book
            </button>
          </form>
        </div>

        {/* Books List */}
        <div className="space-y-4">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-center hover:shadow-lg transition-shadow"
              >
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {book.title}
                  </h2>
                  <p className="text-xl text-gray-600">
                    by {book.author}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveBook(book.id)}
                  className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold rounded-xl transition-colors shadow-md hover:shadow-lg"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <p className="text-xl text-gray-500">
                {searchTerm ? 'No books found matching your search.' : 'No books in the library. Add one above!'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

