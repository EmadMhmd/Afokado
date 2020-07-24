import React, { Component } from 'react';
import { Button,CustomInput , FormGroup ,Label } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';


class UploadImg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            profileImg: ''
        }

        this.toggle = this.toggle.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    onFileChange(e) {
        this.setState({ profileImg: e.target.files[0] })
    }

    onSubmit(e) {
        e.preventDefault()
        const formData = new FormData()

        formData.append('profileImg', this.state.profileImg)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.put("http://localhost:5000/img_upload", formData, config)
        this.toggle();

    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }

    render() {
        return (
            <div>
                <Button className='mainBtn btnL' onClick={this.toggle}>Update Image</Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle}>Update Image</ModalHeader>
                    <ModalBody>
                        <div>
                            <h3 className='formHeader'>Upload New Image</h3>



                            <form onSubmit={this.onSubmit}>
                                
                                
                                <FormGroup>
                                    <Label for="exampleCustomFileBrowser">Select Image</Label>
                                    <CustomInput type="file" id="exampleCustomFileBrowser" name='profileImg' onChange={this.onFileChange} />
                                </FormGroup>

                                <ModalFooter>
                                    <Button className='modelBtn' type="submit" >
                                        Upload
                                </Button>
                                    <Button className='modelBtn' color="secondary" onClick={this.toggle}>Cancel</Button>
                                </ModalFooter>

                            </form>


                        </div>
                    </ModalBody>

                </Modal>
            </div>
        )
    }
}

export default UploadImg;