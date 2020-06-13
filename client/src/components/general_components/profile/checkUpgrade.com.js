import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Button} from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {upgradeUser} from '../../../actions/auth.actions.js';


class Upgrade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }

    render() {
        return (
            <div>
                <Button className='mainBtn btnR' onClick={this.toggle}>Upgrade to Lawyer</Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle}>Upgrade To Lawyer</ModalHeader>
                    <ModalBody>
                        <div>
                            <h3 className='formHeader'>Make Sure First</h3>
                            <p>if you make upgrade to lawyer , you can not apply to any internship  or mangage your old application and you can not make downgrade to student again</p>
                            <ModalFooter>
                                <Button className='modelBtn' type="submit" onClick={()=>this.props.upgradeUser()}>
                                    upgrade
                                                </Button>
                                <Button className='modelBtn' color="secondary" onClick={this.toggle}>Cancel</Button>
                            </ModalFooter>
                        </div>
                    </ModalBody>

                </Modal>
            </div>
        )
    }
}

export default connect(null, { upgradeUser })(Upgrade);