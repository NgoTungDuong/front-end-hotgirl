import React, { Component } from 'react'
import Homescreen from '../container/MainScreen';

export default class CreatePost extends Component {

    componentDidMount() {
        localStorage.getItem('userId');
        localStorage.getItem('username');
    }

    state = {
        imageFile: undefined,
        imageSrc: '',
        title: '',
        content: '',
        description: '',
        errorMassage: ''
    };

    handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        if (imageFile) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(imageFile);
            fileReader.onloadend = (data) => {
                this.setState({
                    imageFile: imageFile,
                    imageSrc: data.currentTarget.result
                });
            };
        };
        // console.log(imageFile)
    };

    handleTitleChange = (event) => {
        this.setState({
            title: event.target.value,
        });
    };

    handleContentChange = (event) => {
        this.setState({
            content: event.target.value,
        });
    };

    handleDescriptionChange = (event) => {
        this.setState({
            description: event.target.value,
        });
    };

    handleFormSubmit = async (event) => {
        event.preventDefault();
        if (!this.state.imageFile || !this.state.title || !this.state.content || !this.state.description) {
            this.setState({
                errorMassage: 'Please input full infomation !!!'
            });
        } else {
            // Upload Image
            const formData = new FormData();
            formData.append('image', this.state.imageFile);
            const uploadImage = await fetch(`http://localhost:3001/uploads/image`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    // 'Content-Type': 'multipart/form-data',
                },
                body: formData,
            })
                .then((res) => res.json())
                .then((data) => console.log(data))
                .catch((error) => {
                    this.setState({
                        errorMassage: error.massage,
                    });
                });
            console.log(uploadImage);
            // Create Post
            const createPost = await fetch(`http://localhost:3001.com/api/posts`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: this.state.title,
                    content: this.state.content,
                    description: this.state.description,
                    imageUrl: this.state.imageSrc,
                })
            })
                .then((res) => res.json())
                .then((data) => console.log(data))
                .catch((error) => {
                    this.setState({
                    errorMassage: error.massage,
                    });
                });
            console.log(createPost);
        }
        window.alert('Create post success');
        window.location.href = '/create-post';
    };

    render() {
        return (
            localStorage.length !== 0 ? (
                <div>
                    <Homescreen/>
                    <h1 className='mt-5' style={{textAlign: 'center'}}><span className= 'badge badge-success'>CREATE NEW POST</span></h1>
                    <div className='row mt-2'>
                        <div className='col-2'></div>
                        <div className='col-8'>
                            <form onSubmit={this.handleFormSubmit}>
                                <div className='form-group'>
                                    <div style={{
                                        position: 'relative',
                                        top: '30px',
                                        textAlign: 'center'

                                    }}
                                        >Select Image ...
                                    </div>
                                    <input 
                                        id='file'
                                        type='file' 
                                        accept='image/*'
                                        className='form-control' 
                                        style={{
                                            color: "transparent",
                                            margin: `0 auto`,
                                            textIndent: '-999em',
                                            zIndex: 10,
                                            height: '50px',

                                        }}
                                        onChange={this.handleImageChange}
                                        />
                                    {this.state.imageSrc ? (
                                        <div style={{textAlign:'center', marginTop: '5px'}}>
                                            <img style={{height:'300px', width:'auto'}} src={this.state.imageSrc} alt='preview' />
                                        </div>
                                    ) : null}
                                        
                                </div>
                                <div className='form-group'>
                                    <input 
                                        className="form-control" 
                                        type='text' 
                                        placeholder='Enter Title ...'
                                        value={this.state.title}
                                        onChange={this.handleTitleChange}
                                    />
                                    <textarea 
                                        className="form-control mt-2 mb-2"
                                        id="exampleFormControlTextarea1" 
                                        rows="4"
                                        placeholder="Please enter content ..."
                                        value={this.state.content}
                                        onChange={this.handleContentChange}
                                    ></textarea>
                                    <input 
                                        className="form-control" 
                                        type='text' 
                                        placeholder='Enter Description ...'
                                        value={this.state.description}
                                        onChange={this.handleDescriptionChange}

                                    />
                                </div>
                                {this.state.errorMassage ? (
                                    <div className="alert alert-danger" role="alert">
                                        {this.state.errorMassage}
                                    </div>
                                ) : null}
                                <div className='form-group'>
                                    <input 
                                        type='submit'
                                        value='Create Post'
                                        className='btn btn-primary'
                                    />
                                </div>
                            </form>
                        </div>
                        <div className='col-2'></div>
                    </div>
                </div>
            ) : (
                window.location.href = '/'
            )
        )
    }
}
