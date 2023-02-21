import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEnvelope} from "@fortawesome/free-regular-svg-icons";

export class Email extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePasswordClick = this.handlePasswordClick.bind(this);
    }

    onUsernameChange(event) {
        this.setState({Username: event.target.value});
    }

    onPasswordChange(event) {
        this.setState({Password: event.target.value});
    }

    handleSubmit(event) {

        fetch('weatherforecast/form', {
            method: 'POST',
            body: JSON.stringify({
                Username: this.state.Username,
                Password: this.state.Password
            }),
            headers: {"Content-Type": "application/json"}
        }).then((res) => res.json())
            .then((result) => {
                alert(result.error_description)
                this.setState({nameError: result.error_description})
            })
    }

    handlePasswordClick(event) {
        this.setState({showPassword: !this.state.showPassword})
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-6">
                        <div className="m-5 p-5 text-center">
                            <h1><FontAwesomeIcon icon={faEnvelope}/></h1>
                            <p>Проверьте свою почту, там письмо))</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}