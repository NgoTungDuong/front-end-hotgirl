import React, { Component } from 'react'
import { Navbar, NavbarBrand, Input, Button, Modal, ModalBody, Form, Row } from 'reactstrap';
import './Header.css';

export default class Header extends Component {

    handleKeyPress = (e) => {
        const submitForm = this.props.login.submitForm;
        if (e.charCode === 13) {
            submitForm();
        }
    }

    render() {
        return (
            <Navbar color='light' className='header-container'>
                <Row className='ml-2'>
                    <Input className='search' type='text' name='search-title' placeholder='Enter your search' />
                    <Button outline color='success' className='mr-2 ml-2' >Search</Button>
                    {localStorage.length !== 0 ? (
                        <a className='btn btn-outline-info' href='/create-post'>+ New Post</a>
                    ) : (
                        <a className='btn btn-outline-info' href='/'>+ New Post</a>
                    )}
                </Row>
                {localStorage.length !== 0 ? (
                    <NavbarBrand href="/homescreen">Techkids Hotgirl</NavbarBrand>
                ): (
                    <NavbarBrand href="/">Techkids Hotgirl</NavbarBrand>
                )}

                {this.props.authUser.userId ? (
                    <div>
                        <strong>Welcome</strong>, <p style={{ color: "blue", display: "inline" }}>{this.props.authUser.firstName} {this.props.authUser.lastName}</p>
                        <Button style={{ marginLeft: "20px" }} color="danger" onClick={this.props.logOut}>Log Out</Button>
                    </div>
                ) : (
                    <div>
                        <Button style={{ marginRight: '10px' }} color='primary' onClick={this.props.login.toggleLogin}>Login</Button>
                        <Button color='danger' onClick={this.props.login.toggleRegister}>Register</Button>
                    </div>
                    )}

                <Modal className='login-modal' isOpen={this.props.loginModalVisible} toggle={this.props.login.toggleLogin}>
                    <ModalBody>
                        <Form onKeyPress={this.handleKeyPress}>
                            <h2 style={{ marginBottom: "20px", color: "green", textAlign: "center" }}>LOGIN WITH US</h2>

                            <Input
                                type='text'
                                placeholder='Username'
                                value={this.props.login.username}
                                onChange={(e) => this.props.login.loginInfoChange({ username: e.target.value })}
                            />

                            <Input
                                style={{ marginBottom: "20px", marginTop: "15px" }}
                                type='password'
                                placeholder='Password'
                                value={this.props.login.password}
                                onChange={(e) => this.props.login.loginInfoChange({ password: e.target.value })}
                            />
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Button color='warning' style={{ marginRight: "20px" }} onClick={this.props.login.submitForm}>LOGIN</Button>
                                <Button color='primary' onClick={this.props.login.loginWithFacebook}>Continue with FaceBook</Button>
                            </div>
                        </Form>
                    </ModalBody>
                </Modal>
                
                <Modal isOpen={this.props.registerModalVisible} toggle={this.props.login.toggleRegister}>
                    <ModalBody>
                        <Form>
                            <h2 style={{ marginBottom: "20px", color: "green", textAlign: "center" }}>REGISTER FOR ENJOY</h2>

                            <Input
                                //username
                                type='text'
                                placeholder='Enter Username'
                                value={this.props.login.registerUsername}
                                onChange={(e) => this.props.login.registerInfoChange({ username: e.target.value })}
                            />

                            <Input
                                //password
                                style={{ marginTop: "10px", marginBottom: "10px" }}
                                type='text'
                                placeholder='Enter Password'
                                value={this.props.login.registerPassword}
                                onChange={(e) => this.props.login.registerInfoChange({ password: e.target.value })}
                            />

                            <Input
                                //nhap lai password
                                type='text'
                                placeholder='Confirm Password'
                                value={this.props.login.registerConfirmPassword}
                                onChange={(e) => this.props.login.registerInfoChange({ confirmPassword: e.target.value })}
                            />

                            <Input
                                //firstname
                                style={{ marginTop: "10px", marginBottom: "10px" }}
                                type='text'
                                placeholder='Enter Your Firstname'
                                value={this.props.login.firstName}
                                onChange={(e) => this.props.login.registerInfoChange({ firstName: e.target.value })}
                            />

                            <Input
                                //lastname
                                type='text'
                                placeholder='Enter Your LastName'
                                value={this.props.login.lastName}
                                onChange={(e) => this.props.login.registerInfoChange({ lastName: e.target.value })}
                            />
                            <div style={{ display: "flex", justifyContent: "space-around" }}>
                                <Button
                                    style={{ marginTop: "20px" }}
                                    color="danger"
                                    onClick={this.props.login.register}
                                >REGISTER</Button>
                            </div>
                        </Form>
                    </ModalBody>
                </Modal>
            </Navbar>
        )
    }
}
