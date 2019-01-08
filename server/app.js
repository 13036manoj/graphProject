
const express = require('express');
const cors = require('cors')
 
// work as middleware for express to single super charged end point ==>'https://localhost:4000/post/graphql'
const graphqlHTTP = require('express-graphql');

const mongoose = require('mongoose');


const schema = require('./schema/schema')

mongoose.connect('mongodb://manoj13036:13036manoj@ds249311.mlab.com:49311/gql-playlist')
mongoose.connection.once('open',()=>{
    console.log('noew conected to mongodb database')
})
 const app = express();
// handling cors
app.use(cors())

//  apply middle ware to express to understand graphql stuff. at super charged point => '/post/graphql'
 app.use('/post/graphql',graphqlHTTP({
     schema:  schema , // required
     graphiql:true   // required to use graqh-i-ql
  })
 )


 app.listen(4000, ()=>{
     console.log('serve r listning at port 400');
 })