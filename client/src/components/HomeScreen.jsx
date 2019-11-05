import React, { Component } from 'react'
import Pagination from './Pagination';
import Homescreen from '../container/MainScreen';
import { Link } from 'react-router-dom';

export default class HomeScreen extends Component {
    // componentDidMount() {
    //     fetch(`http://localhost:3001/api/users`,{
    //         credentials: 'include',
    //         headers: {
    //             'Acept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         method: 'GET',
    //     })
    // }

    state = {
        pageNumber: 1,
        pageSize: 4,
        data: [],
        total: 0,
    }

    componentDidMount() {
        localStorage.getItem('userId');
        localStorage.getItem('username');
        this.setState({
            pageNumber: localStorage.pageNumber,
        })
        // fetch posts
        if (!localStorage.pageNumber) {
            fetch(`http://localhost:3001/api/posts?pageNumber=${this.state.pageNumber}&pageSize=${this.state.pageSize}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
                    this.setState({
                        data: data.data,
                        total: data.total
                    })
                })
        } else {
            fetch(`http://localhost:3001/api/posts?pageNumber=${localStorage.pageNumber}&pageSize=${localStorage.pageSize}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    this.setState({
                        data: data.data,
                        total: data.total,
                    })
                })
                .catch((error) => console.log(error))
        }
    }

    handlePaginationClick = (event) => {
        // setState pageNumber
        this.setState({
            pageNumber: Number(event.target.innerText),
        });
        // fetch new data
        fetch(`http://localhost:3001/api/posts?pageNumber=${event.target.innerText}&pageSize=${this.state.pageSize}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application'
            },
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                this.setState({
                    data: data.data,
                    total: data.total,
                    
                });
                localStorage.setItem('pageNumber', this.state.pageNumber);
                localStorage.setItem('pageSize', this.state.pageSize);
            })
            .catch((error) => console.log(error))
    }   

    render() {
        const myArray = [];
        for (let i = 0; i < Math.ceil(this.state.total / this.state.pageSize); i++) {
            myArray.push(i);
        }
        return (
            localStorage.length !== 0 ? (
                <div>
                    <Homescreen/>
                    <div className='container'>
                        <div className="row">
                            {this.state.data.map((item) => {
                                return (
                                    // <div className="card mt-5" key={item._id}>
                                    //     {/* <div 
                                    //         className="card-img-top"
                                    //         style={{
                                    //             backgroundImage: `url(${item.imageUrl})`,
                                    //             height: '400px',
                                    //             backgroundRepeat: 'no-repeat',
                                    //             backgroundSize: 'cover',
                                    //             backgroundPositionX: 'left'
                                    //         }}
                                    //     >
                                    //     </div> */}
                                    //     <img src={item.imageUrl} className="mx-auto d-block" />
                                    //     <div className="card-body">
                                    //         <p className="card-text">{item.content}</p>
                                    //     </div>
                                    // </div>
                                    <div className="col-3 mt-5 mb-5" key={item._id}>
                                        <Link to={`/images/${item._id}`}>
                                            <img
                                                className='img-fluid'
                                                src={item.imageUrl}
                                                alt={item.title}
                                            />
                                        </Link>
                                        <div style={{textAlign: 'center', backgroundColor: '#f5f5f5'}}>
                                            <h4>{item.title}</h4>
                                            <p>{item.content}</p>
                                        </div>
                                    </div>

                                );
                            })}
                        </div>
                        <Pagination 
                            myArray={myArray}
                            pageNumber={Number(this.state.pageNumber)}
                            handlePaginationClick={this.handlePaginationClick}

                        />
                    </div>
                </div>
            ) : (
                window.location.href = '/'
            )
        )
    }
}

