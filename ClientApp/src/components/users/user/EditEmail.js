import React, {useState, useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCloudUpload, faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {Badge} from "reactstrap";
import {Profile} from "./Profile";

export class EditEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: false,
            isLoaded: false
        };
    }

    onEmailChange(event) {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                email: event.target.value
            }
        }));
    }

    componentDidMount() {
        fetch('/api/users' + window.location.pathname, {method: 'GET'})
            .then(response => response.json())
            .then(data => this.setState({user: data.user, isLoaded: true}));
    }

    handleEdit = () => {
        const {user} = this.state
        if (user.userName) {
            fetch('/api/users' + window.location.pathname + '/email', {
                method: 'PUT',
                body: JSON.stringify({
                    email: user.email
                }),
                headers: {"Content-Type": "application/json"}
            }).then(response => {
                this.setState({status: response.status})
                return response.json()
            }).then((result) => {
                if (this.state.status === 200) {
                    const email = user.email;
                    const boldText = React.createElement('strong', null, email);
                    const message = React.createElement('div', null, 'На электронную почту ', boldText, ' отправлено письмо с дальнейшими указаниями для подтверждения новой почты');

                    this.props.toggleEdit(message)
                }
            })
        }
    }

    handleCancel = () => {
        this.props.toggleEditEmail()
    }

    render() {
        const {user, isLoaded} = this.state;
        if (isLoaded) {
            return (
                <div className="p-2">
                    <h2 className="mb-3">Изменение почты</h2>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="email-addon">@</span>
                        </div>
                        <input id="email" required type="email" className="form-control"
                               placeholder="Почта"
                               aria-label="Почта"
                               aria-describedby="username-addon"
                               value={user.email}
                               onChange={e => this.onEmailChange(e)}/>
                    </div>
                    <div className="d-flex justify-content-end mt-3">
                        <button className="btn btn-primary me-3" onClick={this.handleEdit}>Сохранить</button>
                        <button className="btn btn-outline-danger" onClick={this.handleCancel}>Отмена</button>
                    </div>
                </div>

            )
        }
    }
}
                