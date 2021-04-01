import React, { Component } from "react";
import BookListItem from "../book-list-item";
import { connect } from "react-redux";

import { withBookstoreService } from "../hoc";
import { bookAddedToCart, fetchBooks} from "../../actions";
import { compose } from "../../utils";
import ErrorIndicator from "../error-indicator"
import Spinner from "../spinner";

import "./book-list.css";

const BookList = ({books, onAddedToCart}) => {
  return (
    <ul className="book-list">
      {books.map((book) => {
        return (
          <li key={book.id}>
            <BookListItem 
              book={book} 
              onAddedToCart = {() => onAddedToCart(book.id)}/>
          </li>
        );
      })}
    </ul>
  );
};

class BookListContainer extends Component {
  componentDidMount() {
    const {fetchBooks} = this.props;
    fetchBooks();
  }

  render() {
    const { books, loading, error, onAddedToCart } = this.props;
    if (loading) {
      return <Spinner />;
    }

    if(error) {
      return <ErrorIndicator/>
    }
    return <BookList books = {books} onAddedToCart = {onAddedToCart}/>
  }
}



const mapStateToProps = ({ books, loading, error }) => {
  return {
    books: books,
    loading: loading,
    error: error,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {bookstoreService} = ownProps;
  return {
    fetchBooks: fetchBooks(bookstoreService, dispatch),
    onAddedToCart: (id) => dispatch(bookAddedToCart(id))
  }
}

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);
