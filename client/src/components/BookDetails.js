import React, { Component } from 'react';
import {
     graphql,
     compose      //==>> use to bind graphql query at condition of more than 1 query in a component
    } from 'react-apollo'
import {getSingleBookQuery} from '../queries/queries';

class BookDetails extends Component {
    render() {
        const {getSingleBookQuery} = this.props;
        
        return (
            <div id='book-details'>
            {getSingleBookQuery.loading && <h2>loading book details</h2>}
            {!getSingleBookQuery.loading && getSingleBookQuery.book &&
               <>
                 <h2> Book name :{getSingleBookQuery.book.name}</h2>
                 <p> Book Genre :{getSingleBookQuery.book.genre}</p>
                 <p> Book Author :{getSingleBookQuery.book.author[0].name}</p>
                 <p> all book of this Author</p>
                 <ul>
                     {getSingleBookQuery.book.author[0].books.map((bookData)=>{
                         return(
                             <li>{bookData.name}</li>
                         )
                     })
                     }
                 </ul>
                 </>
                 }
            </div>
        );
    }
}

export default compose(
    graphql(getSingleBookQuery,{
        name:'getSingleBookQuery',
        options:(props)=>{
            return{
              variables :{
                  id:props.selectedBookId
              }
            }
        }
    })
   )(BookDetails);
