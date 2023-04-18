import React, {useState, useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCloudUpload, faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {Badge} from "reactstrap";
import {Profile} from "./Profile";
import {EditEmail} from "./EditEmail";
import {EditPassword} from "./EditPassword";

export class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: false,
            isLoaded: false,
            editEmail: false,
            editPassword: false
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

    onUsernameChange(event) {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                userName: event.target.value
            }
        }));
    }

    onNameChange(event) {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                name: event.target.value
            }
        }));
    }

    onSurnameChange(event) {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                surname: event.target.value
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
            fetch('/api/users' + window.location.pathname, {
                method: 'PUT',
                body: JSON.stringify({
                    name: user.name,
                    surname: user.surname,
                    username: user.userName
                }),
                headers: {"Content-Type": "application/json"}
            }).then(response => {
                this.setState({status: response.status})
                return response.json()
            }).then((result) => {
                if (this.state.status === 200) {
                    window.location.replace('/profile/' + result.user.userName);
                }
            })
        }
    }

    handleCancel = () => {
        this.props.toggleEdit()
    }

    handleEmailEdit = () => {
        this.setState({editEmail: true});
    }

    handlePasswordEdit = () => {
        this.setState({editPassword: true});
    }

    toggleEditEmail = () => {
        this.setState(prevState => ({editEmail: !prevState.editEmail}));
    }

    toggleEditPassword = () => {
        this.setState(prevState => ({editPassword: !prevState.editPassword}));
    }

    render() {
        const {user, isLoaded, editEmail, editPassword} = this.state;
        if (isLoaded) {
            return (
                <div className="col-12 m-0 ps-3">
                    {editEmail ? (
                        <EditEmail toggleEditEmail={this.toggleEditEmail} toggleEdit={this.props.toggleEdit}/>
                    ) : (editPassword ? (
                        <EditPassword toggleEditPassword={this.toggleEditPassword}
                                      toggleEdit={this.props.toggleEdit}/>
                    ) : (
                        <div className="p-2">
                            <h2 className="mb-3">Изменение данных пользователя</h2>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="username-addon">@</span>
                                </div>
                                <input id="username" required type="text" className="form-control"
                                       placeholder="Имя пользователя"
                                       aria-label="Имя пользователя"
                                       aria-describedby="username-addon"
                                       value={user.userName}
                                       onChange={e => this.onUsernameChange(e)}/>
                            </div>
                            <div className="input-group mt-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="name-addon">@</span>
                                </div>
                                <input type="text" className="form-control" placeholder="Имя" aria-label="Имя"
                                       aria-describedby="surname-addon"
                                       value={user.name}
                                       onChange={e => this.onNameChange(e)}/>

                                <div className="input-group-prepend ms-2">
                                    <span className="input-group-text" id="surname-addon">@</span>
                                </div>
                                <input type="text" className="form-control" placeholder="Фамилия"
                                       aria-label="Фамилия"
                                       aria-describedby="surname-addon"
                                       value={user.surname}
                                       onChange={e => this.onSurnameChange(e)}/>
                            </div>
                            <div
                                className="m-0 p-0">
                                <div className="mt-3">
                                    <div className="text-center mt-3">
                                        <label htmlFor="file" id="drop-area"
                                               className="col-12 p-5 border border-5 rounded">
                                            <FontAwesomeIcon
                                                icon={faCloudUpload}/> Выберите или перетащите фото ...
                                        </label>
                                        <input type="file" id="file" name="file" className="d-none"
                                               accept="image/*"/>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end mt-3">
                                <button className="btn btn-primary me-2" onClick={this.handleEdit}>Сохранить
                                </button>
                                <button className="btn btn-secondary me-2"
                                        onClick={this.handleEmailEdit}>Редактировать
                                    почту
                                </button>
                                <button className="btn btn-secondary me-2"
                                        onClick={this.handlePasswordEdit}>Редактировать
                                    пароль
                                </button>
                                <button className="btn btn-outline-danger" onClick={this.handleCancel}>Отмена
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            )
        }
    }
}
                