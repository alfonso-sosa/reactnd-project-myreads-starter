import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import {BookList} from './BookShelf'

class BookSearch extends Component {
	
	state = {
		query: '',
		books: []
	}
	
	search = (query) => {
		if (!query){
			this.setState(() => ({books: [], query: ''}));
			return;
		}
		BooksAPI.search(query).then((books) => {
			if (books["error"]){
				books = [];
			}
			console.log(books);
			this.setState(() => ({books, query}));
		});		
	}

	render() {
		const {moveBook} = this.props;
		const {query, books} = this.state;
		
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link to='/' className='close-search'>Add a book</Link>
					<div className="search-books-input-wrapper">
						{/*
							NOTES: The search from BooksAPI is limited to a particular set of search terms.
							You can find these search terms here:
							https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

							However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
							you don't find a specific author or title. Every search is limited by search terms.
						*/}
						<input 
									type="text" 
									placeholder="Search by title or author"
									value={query} 
									onChange={(event) => this.search(event.target.value) } />

					</div>
				</div>
				<div className="search-books-results">
					<BookList category="Results" 
										moveBook={moveBook}
										books={books}/>
				</div>
			</div>
		);
	}
}

export default BookSearch
