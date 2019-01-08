import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import BookDetails from './BookDetails'

import {getBookQuery} from '../queries/queries'

class BookList extends Component {
    constructor(props){
        super(props)
        this.state={
          selectedBookId:''
        }
      }
    render() {
        const { data } = this.props;
        return (
            <div id='book-list'>
                {data.loading && <h2> loading ...........</h2>}
                {!data.loading &&
                    <ul>
                        {data.books.map((book, key) => {
                            return <li key={key} onClick={()=>this.setState({selectedBookId:book.id})}> {book.name}</li>
                        })}
                    </ul>
                }
            <BookDetails selectedBookId={this.state.selectedBookId}/>
            </div>
        );
    }
}

export default graphql(getBookQuery)(BookList);
