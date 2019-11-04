import React, { Component } from 'react'

import Header from '../components/Header';  
import firebase from 'firebase';

export default class Homescreen extends Component {
    

    state = {
        loginModalVisible: false,
        registerModalVisible: false,
        loginInfo: {
            username: '',
            password: '',
        },
        registerInfo: {
            username: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
        },
        authUser: {},
    };

    componentDidMount() {
        localStorage.getItem('userId');
        if (!firebase.app.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyBCGCCl1KHrGpMZjdRQfoeMiQ3VEfStnjc",
                authDomain: "techkids-hotgirl-2ab39.firebaseapp.com",
                databaseURL: "https://techkids-hotgirl-2ab39.firebaseio.com",
                projectId: "techkids-hotgirl-2ab39",
                storageBucket: "techkids-hotgirl-2ab39.appspot.com",
                messagingSenderId: "784084319356",
            });
        }
        const userId = localStorage.getItem('userId');
        const firstName = localStorage.getItem('firstName');
        const lastName = localStorage.getItem('lastName');
        this.setState({
            authUser: {
                userId,
                firstName,
                lastName,
            }
        });
    }

    toggleLogin = () => {
        this.setState({
            loginModalVisible: !this.state.loginModalVisible,
        });
    };

    toggleRegister = () => {
        this.setState({
            registerModalVisible: !this.state.registerModalVisible,
        });
    };

    loginInfoChange = (newLoginInfo) => {
        this.setState({
            loginInfo: {
                ...this.state.loginInfo,
                ...newLoginInfo,
            }
        });
    };

    registerInfoChange = (newRegisterInfo) => {
        this.setState({
            registerInfo: {
                ...this.state.registerInfo,
                ...newRegisterInfo
            }
        });
        
    };


    registerSubmit = async () => {
        console.log(this.state.registerInfo)
        // Validate form
        if (this.state.registerInfo.password !== this.state.registerInfo.confirmPassword) {
            window.alert('Password does not match');
        } else {
            // fetch to api server
            try {
                const result = await fetch(`https://hotgirl-back-end.herokuapp.com/api/auth/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.state.registerInfo),
                }).then((res) => res.json());
                // success => update UI
                if (!result.success) {
                    window.alert(result.message)    
                } else {
                    window.alert(result.message);
                    this.toggleRegister();
                }
            } catch (error) {
                console.log(error);
                window.alert(error);
            }
        }
    };

    loginSubmit = async() => {
        // Validate form
        if (!this.state.loginInfo.username || !this.state.loginInfo.password) {
            window.alert('Please input username and password');
        } else {
            // fetch to api server
            try {
                const result = await fetch(`//hotgirl-back-end.herokuapp.com/api/auth/login`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.state.loginInfo),

                }).then((res) => res.json());
                console.log(result);
                // success => update UI
                if (!result.success) {
                    window.alert(result.message);
                    this.setState({
                        loginInfo: {
                           ...this.state.loginInfo,
                           password: '',
                        }
                    })
                } else {
                    console.log(result);
                    window.alert(result.message);
                    window.localStorage.setItem('userId', result.id);
                    window.localStorage.setItem('username', result.username);
                    window.localStorage.setItem('firstName', result.firstName);
                    window.localStorage.setItem('lastName', result.lastName);
                    window.location.href = '/homescreen';
                    this.toggleLogin();
                    this.setState({
                        authUser: {
                            userId: result.id,
                            firstName: result.firstName,
                            lastName: result.lastName,
                        }
                    });
                    this.setState({
                        loginInfo: {
                            username: '',
                            password: '',
                        }
                    });
                    
                }
            } catch (error) {
                console.log(error);
                window.alert(error);
            }
        }
    };

    loginWithFacebook = async() => {
        try {
            const facebookProvider = new firebase.auth.FacebookAuthProvider();
            if (!firebase.app.length) {
                firebase.initializeApp({})
            }
            const result = await firebase.auth().signInWithPopup(facebookProvider);
            const idToken = await result.user.getIdToken();
            console.log(result);
            console.log(idToken);
            // const verifyTokenResult = await fetch(`http://localhost:3001/api/auth/facebookOauth`, {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
            //   body: JSON.stringify({
            //     idToken,
            //   })
            // }).then((res) => res.json());
            // console.log(verifyTokenResult);

            window.alert('Dang nhap thanh cong');
            window.localStorage.setItem('userId', result.additionalUserInfo.profile.id);
            window.localStorage.setItem('username', result.additionalUserInfo.profile.name);
            window.localStorage.setItem('firstName', result.additionalUserInfo.profile.first_name);
            window.localStorage.setItem('lastName', result.additionalUserInfo.profile.last_name);
            this.toggleLogin();
            this.setState({
                authUser: {
                    userId: result.additionalUserInfo.profile.id,
                    firstName: result.additionalUserInfo.profile.first_name,
                    lastName: result.additionalUserInfo.profile.last_name,
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    logOut = async() => {
        window.localStorage.clear();
        window.location.href = '/';
        this.setState({
            authUser: {}
        });
        const result = await fetch(`https://hotgirl-back-end.herokuapp.com/api/auth/logout`, {
            credentials: 'include',
            method: "GET",
        }).then((res) => res.json());
        console.log(result);
    }
    render() {
        return (
            <div>
                <Header
                    loginModalVisible = { this.state.loginModalVisible }
                    registerModalVisible = { this.state.registerModalVisible }
                    login = {
                        {
                            username: this.state.loginInfo.username,
                            password: this.state.loginInfo.password,
                            registerUsername: this.state.registerInfo.username,
                            registerPassword: this.state.registerInfo.password,
                            registerConfirmPassword: this.state.registerInfo.confirmPassword,
                            firstName: this.state.registerInfo.firstName,
                            lastName: this.state.registerInfo.lastName,
                            toggleLogin: this.toggleLogin,
                            submitForm: this.loginSubmit,
                            register: this.registerSubmit,
                            registerInfoChange: this.registerInfoChange,
                            loginInfoChange: this.loginInfoChange,
                            loginWithFacebook: this.loginWithFacebook,
                            toggleRegister: this.toggleRegister,
                        }
                    }
                    authUser = { this.state.authUser }
                    logOut = { this.logOut }
                />
            </div>
        )
    }
}
