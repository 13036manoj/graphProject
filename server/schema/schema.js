const graphql = require('graphql')  // js implementation of graphql 

const _ = require('lodash');

const Book = require('../models/book')
const Author = require('../models/author')


const {
GraphQLSchema,
GraphQLObjectType,   // specific to graphql js package because graphql  also consist Int and float data so there is need wrapping coming data type to graphql data type
GraphQLID,           // if we pass int or staring graphql js server package will automaticall manage.
GraphQLString,
GraphQLInt,
GraphQLList,
GraphQLNonNull  // constraint if we pass null value 

} = graphql;


const BookType = new GraphQLObjectType({
    name :'Book',
    fields:()=>({   // here we use es6 function to return object just because it may contain variable which is declaire below at that condition we will get refrence error
        id :{ type :GraphQLString },
        name:{ type : GraphQLString },
        genre:{type: GraphQLString},
        authorId:{type: GraphQLID},
        author:{ 
            type : new GraphQLList(AuthorType),
            resolve(parent,args){
                console.log('book as a parent  form author ',parent)
                return Author.find({_id : parent.authorId})

            }
         }

    })
})

const AuthorType = new GraphQLObjectType({
    name :'Author',
    fields:()=>({   // here we use es6 function to return object just because it may contain variable which is declaire below at that condition we will get refrence error
        id :{ type : GraphQLString },
        age:{ type : GraphQLInt },
        name:{type: GraphQLString},
        books:{ 
            type : new GraphQLList(BookType),
            resolve(parent,args){
                console.log('book as a parent  form author ',parent)
                return Book.find({authorId : parent.id})
            }
         }

    })
})

const RootQuery =new GraphQLObjectType ({
    name :'RootQueryType',
    fields:{            // here is no need es6 function because it is at bottom 
        book:{
            type: BookType,
            args : { id :{ type: GraphQLID}},
            resolve(parent ,args){
             return  Book.findById({_id :args.id})
            }
        },
        author:{
            type: AuthorType,
            args : { id :{ type: GraphQLID}},
            resolve(parent ,args){
             return  Author.findById({_id :args.id})
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent ,args){
            return Book.find({})
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent ,args){
            return Author.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name : 'Mutation',
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                 name : {type : new GraphQLNonNull(GraphQLString)},
                 age : { type : new GraphQLNonNull(GraphQLInt)}
                },
            resolve (parent,args){
                let author = new Author({
                    name : args.name,
                    age  : args.age
                });
                return author.save();

            }    

        },
        addBook:{
            type:BookType,
            args:{
                 name : {type : new GraphQLNonNull(GraphQLString)},
                 genre : { type : new GraphQLNonNull(GraphQLString)},
                 authorId :{ type : new GraphQLNonNull(GraphQLID)}
                },
            resolve (parent,args){
                let book = new Book({
                    name : args.name,
                    genre: args.genre,
                    authorId:args.authorId
                });
                return book.save();

            }    

        }
    }
})
module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation: Mutation
})
