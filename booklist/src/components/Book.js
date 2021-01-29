import React, {Component, useState} from 'react';
import styles from './styles.css';
import {Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormText, Label, Input} from 'reactstrap';
import {Card} from 'react-bootstrap';
import axios from 'axios';

export default class Book extends React.Component {

    // const [book, setBook] = useState([]);
    // const [apiKey, setapitKey] = useState("AIzaSyDqQ6hADLtNqQ9kzAxsxxR7hwld1ankTs0");
     constructor(props){
        super(props);
        this.state = {
        books: [],
        newBook: false,
        newData:{
            name:'',
            price:'',
            categories:'',
            des:''
        },
        newBookList:[],
        editData:{
            name:'',
            price:'',
            categories:'',
            des:''
        }
        }
        this.addNew = this.addNew.bind(this);
        this.confirmAdded = this.confirmAdded.bind(this);
        // this.handleChange = this.handleChange.bind(this);
    }
    
    // apilink = 'https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyDqQ6hADLtNqQ9kzAxsxxR7hwld1ankTs0';
    
    componentWillMount = () => {
        axios.get('https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyDqQ6hADLtNqQ9kzAxsxxR7hwld1ankTs0').then((response) =>{
            this.setState({
                books:response.data.items
            })
        });
    }

    addNew() {
        this.setState({
            newBook:!this.state.newBook//for toggle
        })
        
    }

    //confirm add new book
    confirmAdded(e) {
        this.setState((prevState) =>{
            return{
                books:prevState.books.concat(this.state.newData),
                newData:{
                    name:'',
                    price:'',
                    categories:'',
                    des:''  
                }
            };
        });
        
        console.log(this.state.books);
        e.preventDefault();
         console.log(this.state.newData);
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
        });
        // let newBookList = this.state.newData.map((j) =>{
        //     return (
        //         <tr >
        //             <td>{j.name}</td>
        //             <td>{j.price} CAD</td>
        //             <td>{j.categories}</td>
        //             <td>{j.des}</td>
        //             <td>
        //                 <Button color = "primary" size="sm" className = "mr-2" active >Edit</Button>
                        
        //                 <Button color = "danger" size = "sm" active>Delete</Button>
        //             </td>
        //         </tr>
        //         )
        // });

        return(
            <div className={styles.text}>
            <Table>
            <Button color="primary" onClick={this.addNew}>Add A New Book</Button>
            <Modal isOpen={this.state.newBook} toggle={this.addNew} >
                <ModalHeader toggle={this.addNew}>Modal title</ModalHeader>
                <ModalBody>
                <Form onSubmit = {this.confirmAdded}>
                    <FormGroup>
                        <Label for="name">Book Name</Label>
                        <Input id="name"  placeholder="Please type Book Name" value={this.state.newData.name} onChange={(e) => {
                            let {newData} = this.state;
                            newData.name = e.target.value;
                            this.setState({newData});
                        }}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="price">Price</Label>
                        <Input id="price"  placeholder="Please type Price in CAD" value={this.state.newData.price} onChange={(e) => {
                            let {newData} = this.state;
                            newData.price = e.target.value;
                            this.setState({newData});
                        }}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="categories">category</Label>
                        <Input  id="categories"  placeholder="Please type Category" value={this.state.newData.categories} onChange={(e) => {
                            let {newData} = this.state;
                            newData.categories = e.target.value;
                            this.setState({newData});
                        }}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="des">Description</Label>
                        <Input id="des"  placeholder="Please type Description" value={this.state.newData.des}  onChange={(e) => {
                            let {newData} = this.state;
                            newData.des = e.target.value;
                            this.setState({newData});
                        }}/>
                    </FormGroup>
                </Form>

                </ModalBody>
                <ModalFooter>
                <Button color="primary" type="submit">Confirm Added</Button>{' '}
                <Button color="secondary" onClick={this.addNew} >Cancel</Button>
                </ModalFooter>
            </Modal>

            <tbody>
              {books}
              {/* {newBookList} */}

            </tbody>
            </Table>
            </div>
        );
    
}
}

