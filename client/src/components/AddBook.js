import React, { Component } from 'react';
import { gql } from 'apollo-boost'
import {
     graphql,
     compose      //==>> use to bind graphql query at condition of more than 1 query in a component
    } from 'react-apollo'
import FormApp from './FormikForm'
import {getAuthorQuery,addBookMutation} from '../queries/queries';

class AddBook extends Component {
    render() {
        const { getAuthorQuery,addBookMutation} = this.props;
        return (
            <div className="formContainer">
              <h3>add book form</h3>
               {!getAuthorQuery.loading &&
                <FormApp 
                    authorArray={getAuthorQuery} 
                    addBookMutation={addBookMutation}
                    />}
            </div>
        );
    }
}

export default compose(
    graphql(getAuthorQuery,{name:'getAuthorQuery'}),
    graphql(addBookMutation,{name:'addBookMutation'}),
   )(AddBook);
