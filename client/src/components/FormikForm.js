import React, { Component } from 'react';
import {withFormik , Form, Field} from 'formik'
import * as Yup from 'yup'
import './App.css';
import {getBookQuery} from '../queries/queries';


const displayAuthor=(authorArray)=>{
    console.log('sdfedgdfg',authorArray)
    if(authorArray.loading ){
        return   <option value='loading' disabled key='loading'>loading</option>
      }else{
         return  authorArray.authors.map((author,key)=>{
                return  <option value={author.id} key={author.id}>{author.name}</option>
            })
    }
}
const App =({values,errors,touched,isSubmitting,authorArray})=> {
    console.log('props',authorArray)
    return (
      <React.Fragment>
      <Form >
        <div className='App'>
          {touched.book && errors.book && <p className='errorClass'>{errors.book}</p> }
          <Field name='book' type='text' placeholder='Book Name' />
        </div>
        <div className='App'>
         { touched.genre && errors.genre && <p className='errorClass'>{errors.genre}</p> }
         <Field name='genre' type='genre' placeholder='genre'/>
        </div>
        <br/>
        <label className='App'>
         <Field component='select' name ='author' defaultValue={values.author}>
               <option disabled>select Auther</option>
               {displayAuthor(authorArray)}
           }
        </Field>
          Author
        </label>
        <br/>
        <div style={{marginTop:'20px',float:'center' ,textAlign:'center',height:'42px',background:'#7f7f7f'}}>
          <button style={{textAlign:'center',border:'1px solid red',height:'23px'}} disabled={isSubmitting} type="submit">save</button>
        </div>
      </Form>
     </React.Fragment>
    );
  }

const formApp=withFormik({
  mapPropsToValues({book,genre,author}){
    return{
      book:book || '',
      genre:genre || '',
      author:author || '',
    }
  },
  handleSubmit(values,{resetForm,setError,setSubmitting,props}){
    // setTimeout(()=>{
    //   if(values.book=='book1'){
    //     setError({book:'That book is already taken'})
    //   }else{
    //     //   this.mapPropsToValues.addBook(data)
    //     resetForm()
    //   }
    //   setSubmitting(false)
    // },2000)
    props.addBookMutation({
        variables:{
            name:values.book,
            genre:values.genre,
            authorId:values.author,
        } ,
        refetchQueries:[{query:getBookQuery}]  // after mutation refetch query to reflect new changes
    })
    // resetForm()
    // setError({book:'That book is already taken'})  // set error in api not hit properly 
    setSubmitting(false)

  },
  validationSchema : Yup.object().shape({
    book:Yup.string().min(1,'Book Name must be 1 character or longer').required('Book name is required'),
    genre:Yup.string().min(3, 'Genre must be 3 character or longer').required('genre is required')
  })
})(App)
export default formApp;
