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

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({books}))
    });
	}

	moveBook = (book, shelf) => {
		BooksAPI.update(book, shelf).then((books) => {
			book.shelf = shelf;
			this.setState((currState) => ({books: currState.books}));
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
          <BookSearch/>
        )} />
      </div>

    )
  }
}

export default BooksApp
