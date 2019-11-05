import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import CreatePost from './components/CreatePost';
import MainScreen from './container/MainScreen';
import DetailScreen from './container/DetailScreen';
export default class App extends Component {

    setStyle = () => {
       const img = document.getElementById('background-img');
       img.style.display = 'none';
    }

    render() {
        return ( 
            <div className="APP">
                <BrowserRouter>
                    <Route exact path='/' component={MainScreen} />
                    <Route path='/homescreen' render = {(props) => {
                        return <HomeScreen 
                            {...props}
                            setStyle = {this.setStyle}
                        />
                    }}/>
                    <Route path='/images/:imageId' render = {(props) => {
                        return <DetailScreen
                            {...props}
                            setStyle = {this.setStyle}
                        />
                    }} />
                    <Route path='/create-post' render = {(props) => {
                        return <CreatePost
                            {...props} 
                            setStyle = {this.setStyle}
                        />
                    }} />
                </BrowserRouter>
                <div>
                    <img id='background-img' src='https://img2.thuthuatphanmem.vn/uploads/2019/02/22/anh-gai-xinh-hinh-nen_121749562.jpg' className='img-fluid'/>
                </div>
            </div>
            
        )
    }
}