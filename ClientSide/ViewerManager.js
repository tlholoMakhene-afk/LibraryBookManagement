const axios = require('axios');

async function getBooksData() {
    try {
      const response = await axios.get('http://localhost:3000/books');
      console.log(response.data);
      return response.data; 
    } catch (error) {
      console.error(error);
    }
}

async function getSpecifiedBook(id) {
    try {
      const response = await axios.get(`http://localhost:3000/books/${id}`);
      console.log(response.data);
      return response.data; 
    } catch (error) {
      console.error(error);
    }
}

async function DeleteBook(id) {
    try {
        let res = await axios.delete(`http://localhost:3000/books/${id}`);
        console.log(res.status);
        return true; 
      } catch (error) {
        console.error(error);
        return false;
      }
    
}

async function InsertNewBook(params) {
    try {

        params = {
            title: params.title,
            author: params.author,
            date_of_publication: params.date,
            book_category: params.category,
          }
    
        let res = await axios.post('http://localhost:3000/books/', params);
    
        console.log(res.data);

        return true; 
      } catch (error) {
        console.error(error);
        return false;
      }
    
}

async function UpdateBook(id,params) {
    try {

        params = {
            title: params.title,
            author: params.author,
            date_of_publication: params.date,
            book_category: params.category,
          }
    
        let res = await axios.patch(`http://localhost:3000/books/${id}`, params);
    
        console.log(res.data);

        return true; 
      } catch (error) {
        console.error(error);
        return false;
      }
    
}

module.exports = 
{
    getBooksData,getSpecifiedBook,DeleteBook,InsertNewBook,UpdateBook
}