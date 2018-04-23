import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from 'react-router-dom'
import BookSearch from './BookSearch'
import BookShelf from './BookShelf'

class BooksApp extends React.Component {
  state = {
    books: []
  }

	getBooks = ()=>{
		BooksAPI.getAll().then((books) => {
      this.setState(() => ({books}))
    });
	}

  componentDidMount(){
    this.getBooks();
	}

	moveBook = (book, shelf) => {
		BooksAPI.update(book, shelf).then((books) => {
			this.getBooks();
		});
	}

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={()=>(
          <BookShelf books={this.state.books}
										 moveBook={this.moveBook}/>
        )} />
        <Route path='/search' render={(history)=>(
          <BookSearch moveBook={this.moveBook}/>
        )} />
      </div>
    )
  }
}

export default BooksApp
