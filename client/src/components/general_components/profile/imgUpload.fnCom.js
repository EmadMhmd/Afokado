import React, { Component } from 'react';
import axios from 'axios';

class ImgUpload extends Component {

    constructor(props) {
        super(props);

        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            profileImg: ''
        }
    }

    onFileChange(e) {
        this.setState({ profileImg: e.target.files[0] })
    }

    onSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        
        formData.append('profileImg', this.state.profileImg)
        /*
        axios.put("http://localhost:5000/img_upload", formData, {
        }).then(res => {
            console.log(res)
        })*/


        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.put("http://localhost:5000/img_upload",formData,config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
        });
    
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input type="file" name='profileImg' onChange={this.onFileChange} />
                        </div>
                        {console.log(this.state.file)}
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default ImgUpload