import React, { Component } from 'react'
import Homescreen from './MainScreen';

export default class DetailScreen extends Component {
    state = {
        image: []
    };
    componentDidMount() {
        this._isMounted = true;
        this.props.setStyle();
        fetch(`http://localhost:3001/api/posts/${this.props.match.params.imageId}`,{
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    image: data
                });
            })
            .catch(error => console.log(error))
    }

    handleBack = () => {
        window.history.back();
    }

    render() {
        return (
            <div>
                <Homescreen/>
                <div className='container mt-3'>
                    <div className='row'>
                        <div>
                            <button
                                className='btn btn-primary'
                                onClick={this.handleBack}
                            >BACK
                            </button>
                        </div>  
                        <div style={{textAlign: 'center'}} className='col-8 mr-auto ml-auto'>
                            <img
                                className='img-fluid'
                                src={this.state.image.imageUrl}
                                alt={this.state.image.title}
                            />
                            <div>
                                <h4>{this.state.image.title}</h4>
                                <p>{this.state.image.content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
