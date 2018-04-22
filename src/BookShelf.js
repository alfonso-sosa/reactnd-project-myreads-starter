import React, {Component} from 'react'
import {Link} from 'react-router-dom'

function splitCamelCaseToString(s) {
	const split =  s.split(/(?=[A-Z])/).join(' ');
	return split.charAt(0).toUpperCase() + split.slice(1);
}

class BookList extends Component {	
	render() {
		const {category, books, moveBook} = this.props;
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{splitCamelCaseToString(category)}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{books.map((book) => (
							<li key={book.id}>
								<div className="book">
									<div className="book-top">
										<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url('${book.imageLinks.thumbnail}')` }}></div>
										<div className="book-shelf-changer">
											<select value={book.shelf} onChange={(event) => moveBook(book, event.target.value)}>
												<option value="none" disabled>Move to...</option>
												<option value="currentlyReading">Currently Reading</option>
												<option value="wantToRead">Want to Read</option>
												<option value="read">Read</option>
												<option value="none">None</option>
											</select>
										</div>
									</div>
									<div className="book-title">{book.title}</div>
									{book.authors.map((author)=>(
										<div className="book-authors" key={author}>
											{author}
										</div>
									))}
								</div>
							</li>
						))}
					</ol>
				</div>
			</div>
		);
	}
}

class BookShelf extends Component {
	
	render() {
		const categories = ['currentlyReading', 'wantToRead', 'read'];
		const {books, moveBook} = this.props;
		return (
			<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              {categories.map((category) => (
								<BookList key={category} 
													category={category} 
													moveBook={moveBook}
													books={books.filter(book => (book.shelf === category))}/>
							))}
            </div>
            <div className="open-search">
              <Link to='/search' className='open-search'>Add a book</Link>
            </div>
          </div>
		);
	}
}

export default BookShelf
