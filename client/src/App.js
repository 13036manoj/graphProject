import React, { Component } from 'react';
import BookList from './components/BookList'
import AddBook from './components/AddBook'

/* 
apollo-boost: Package containing everything you need to set up Apollo Client . For advance config we need migrate from apolloboost
react-apollo: View layer integration for React
graphql: Also parses your GraphQL queries
*/
import {ApolloProvider} from 'react-apollo'
import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
uri:'http://localhost:4000/post/graphql'
})
class App extends Component {
 
  render() {
    return (
      <ApolloProvider  client={client}>
      <div className="App" id='main'>
        <h1> graphql mongoose book playlist</h1>
        <BookList/>
        <AddBook/>
      </div>
      </ApolloProvider>
    );
  }
}

export default App;
