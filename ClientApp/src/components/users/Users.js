import React, {useState, useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {Badge} from "reactstrap";

export class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isLoaded: false
        };
    }


    componentDidMount() {
        fetch('/api/users/search', {method: 'GET'})
            .then(response => response.json())
            .then(data => this.setState({users: data, isLoaded: true}));
    }


    render() {
        const {users, isLoaded} = this.state;
        if (isLoaded) {
            return (
                <div className="row">
                    <div className="col-8 m-auto row">
                        {users.map(userRole => (
                            <div className="col-4 m-0 p-3">
                                <div className="form-control">
                                    <div className="row">
                                        <div className="p-2">
                                            <a href={'/profile/' + userRole.user.userName}>
                                                <img alt="" className="col-12 img img-responsive rounded-circle"
                                                     src={userRole.user.avatarUrl}/></a>
                                        </div>
                                        <div className="col-12 m-0">
                                            <a className="text-decoration-none text-reset"
                                               href={'/profile/' + userRole.user.userName}>
                                                <p className="m-0">@{userRole.user.userName}</p>
                                                <h4>Селявко Иван</h4>
                                            </a>
                                            {userRole.roles.map(role => (
                                                <a href={'/profile/' + userRole.user.userName}
                                                   className="text-decoration-none text-reset">
                                                <Badge className="mr-2">{role}</Badge>{' '}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                </div>
            )
        }
    }
}