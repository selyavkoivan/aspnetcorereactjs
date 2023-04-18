import React, {useState, useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCloudUpload, faEye, faEyeSlash, faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {Badge} from "reactstrap";
import {Profile} from "./Profile";
import {toast} from "react-toastify";

export class EditPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: false,
            isLoaded: false,
            showPassword: false
        };
    }

    onOldPasswordChange(event) {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                OldPassword: event.target.value
            }
        }));
    }

    onNewPasswordChange(event) {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                NewPassword: event.target.value
            }
        }));
    }

    onRepeatedNewPasswordChange(event) {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                RepeatedNewPassword: event.target.value
            }
        }));
    }

    handlePasswordClick = (event) => {
        this.setState({showPassword: !this.state.showPassword})
    }

    handleEdit = () => {
        const {user} = this.state
        if (user.NewPassword === user.RepeatedNewPassword) {
            if (user.NewPassword !== user.OldPassword) {
                fetch('/api/users' + window.location.pathname + '/password', {
                    method: 'PUT',
                    body: JSON.stringify({
                        SignInPassword: user.OldPassword,
                        Password: user.NewPassword,
                        RepeatedPassword: user.RepeatedNewPassword,
                    }),
                    headers: {"Content-Type": "application/json"}
                }).then(response => {
                    if (response.status === 200) {
                        this.props.toggleEdit('Пароль успешно изменен')
                    } else {
                        this.ShowToastError('Ошибка при изменении пароля! Проверьте правильность введенных данных.')
                    }
                })
            } else {
                this.ShowToastError('Новый пароль не должен совпадать со старым. Пожалуйста, попробуйте еще раз.')
            }
        } else {
            this.ShowToastError('Новый пароль и повторенный пароль не совпадают. Пожалуйста, попробуйте еще раз.')
        }
    }
    
    ShowToastError = (message) => {
        toast.error(message, {
            position: 'top-right',
            autoClose: 10000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    handleCancel = () => {
        this.props.toggleEditPassword()
    }

    render() {
        const {user} = this.state;
        return (
            <div className="p-2">
                <h2 className="mb-3">Изменение пароля</h2>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                                <span role="button" className="input-group-text" id="password-addon"
                                      onClick={this.handlePasswordClick}>
                                    <p className="m-0">
                                        <FontAwesomeIcon icon={this.state.showPassword ? faEyeSlash : faEye}/>
                                    </p>
                                </span>
                    </div>
                    <input required type={this.state.showPassword ? 'text' : 'password'}
                           className="form-control" placeholder="Пароль" aria-label="Старый пароль"
                           aria-describedby="password-addon" value={user.OldPassword}
                           onChange={e => this.onOldPasswordChange(e)}/>
                </div>
                <hr/>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                                <span role="button" className="input-group-text" id="repeated-password-addon"
                                      onClick={this.handlePasswordClick}>
                                    <p className="m-0">
                                        <FontAwesomeIcon icon={this.state.showPassword ? faEyeSlash : faEye}/>
                                    </p>
                                </span>
                    </div>
                    <input required type={this.state.showPassword ? 'text' : 'password'}
                           className="form-control" placeholder="Новый пароль"
                           aria-describedby="repeated-password-addon" value={user.NewPassword}
                           onChange={e => this.onNewPasswordChange(e)}/>
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                                <span role="button" className="input-group-text" id="repeated-password-addon"
                                      onClick={this.handlePasswordClick}>
                                    <p className="m-0">
                                        <FontAwesomeIcon icon={this.state.showPassword ? faEyeSlash : faEye}/>
                                    </p>
                                </span>
                    </div>
                    <input required type={this.state.showPassword ? 'text' : 'password'}
                           className="form-control" placeholder="Повторите новый пароль"
                           aria-describedby="repeated-password-addon" value={user.RepeatedNewPassword}
                           onChange={e => this.onRepeatedNewPasswordChange(e)}/>
                </div>
                <div className="d-flex justify-content-end mt-3">
                    <button className="btn btn-primary me-3" onClick={this.handleEdit}>Сохранить</button>
                    <button className="btn btn-outline-danger" onClick={this.handleCancel}>Отмена</button>
                </div>
            </div>

        )
    }
}