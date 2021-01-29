import React, {Component, useState} from 'react';
import styles from './styles.css';
import {Table, Button} from 'reactstrap';
import {Card} from 'react-bootstrap';
import axios from 'axios';

export default class Book extends React.Component {

    // const [book, setBook] = useState([]);
    // const [apiKey, setapitKey] = useState("AIzaSyDqQ6hADLtNqQ9kzAxsxxR7hwld1ankTs0");
     constructor(props){
        super(props);
        this.state = {
        books: []
        }

    }
    // apilink = 'https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyDqQ6hADLtNqQ9kzAxsxxR7hwld1ankTs0';
    
    componentWillMount = () => {
        axios.get('https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyDqQ6hADLtNqQ9kzAxsxxR7hwld1ankTs0').then((response) =>{
            this.setState({
                books:response.data.items
            })
        });
    }

    // const fetchData = async () =>{
    //     const res = await axios.get(`${apilink}`, {headers: {Accept:"application/json" }});
    //     console.log('details', res.data.items);
       
    // }

    render(){
        let books = this.state.books.map((i) =>{
            return (
            <tr key = {i.id}>
                <td>{i.volumeInfo.title}</td>
                <td>{i.saleInfo.saleability} CAD</td>
                <td>{i.volumeInfo.categories}</td>
                <td>{i.volumeInfo.description}</td>
                <td>
                    <Button color = "primary" size="sm" className = "mr-2" active >Edit</Button>
                    
                    <Button color = "danger" size = "sm" active>Delete</Button>
                </td>
            </tr>
            )
        })
        return(
            <div className={styles.text}>
            <Table>
            <thead>
                <tr>
                    <th>Book Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Delete Button</th>
                </tr>
            </thead>

            <tbody>
              {books}

            </tbody>
            </Table>
            </div>
        );
    
}
}

