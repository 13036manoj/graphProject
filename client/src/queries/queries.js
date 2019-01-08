import { gql } from 'apollo-boost'


//  construting query with the help of gql because it is not js
const getAuthorQuery = gql`
{
    authors{
        name
        age 
        id
    }
}`

//  construting query with the help of gql because it is not js
const getBookQuery = gql`
{
    books{
        id
        name
        genre
        authorId
    }
}`
const getSingleBookQuery = gql`
  query($id : ID!){
    book(id:$id){
        name
        genre
        id
        author{
            name
            age
            id
            books{
                name
                id
            }
        }
    }
}`

// for mutation
//  construting query with the help of gql because it is not js
const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $authorId:ID!){
        addBook(name:$name,genre:$genre,authorId:$authorId){
            name
        }
}`
export {getAuthorQuery,getBookQuery,addBookMutation, getSingleBookQuery};
