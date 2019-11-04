import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import CreatePost from './components/CreatePost';
import MainScreen from './container/MainScreen';
import DetailScreen from './container/DetailScreen';
export default class App extends Component {

    render() {
        return ( 
            <div className="APP">
                <BrowserRouter>
                    <Route exact path='/' component={MainScreen} />
                    <Route path='/homescreen' component={HomeScreen} />
                    <Route path='/images/:imageId' component={DetailScreen} />
                    <Route path='/create-post' component={CreatePost} />
                </BrowserRouter>
            </div>
        )
    }
}