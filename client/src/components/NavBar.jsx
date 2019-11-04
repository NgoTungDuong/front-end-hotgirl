import React, { Component } from 'react'
import { Navbar, NavbarBrand, Input, Button, Form, Row } from 'reactstrap';

export default class NavBar extends Component {
    render() {
        return (
            <Navbar color='light' className='header-container' style={{display: 'flex', justifyContent: 'space-between'}}>
                <Row className='ml-2'>
                    <Input className='search' type='text' name='search-title' placeholder='Enter your search' />
                    <Button outline color='success' className='mr-2 ml-2' >Search</Button>
                    {localStorage.length !== 0 ? (
                        <a className='btn btn-outline-info' href='/create-post'>+ New Post</a>
                    ) : (
                        <a className='btn btn-outline-info' href='/'>+ New Post</a>
                    )}
                </Row>
                <NavbarBrand href="/homescreen">Techkids Hotgirl</NavbarBrand>
                <div>
                    <strong>Welcome</strong>, <p style={{ color: "blue", display: 'inline'}}>{localStorage.firstName} {localStorage.lastName}</p>
                    <Button style={{ marginLeft: "20px" }} color="danger">Log Out</Button>
                </div>
            </Navbar>
        )
    }
}
