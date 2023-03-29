import React, {useState, useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";

export class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
        
        alert(window.location.hostname)
    }


    componentDidMount() {
        fetch('/users/all', {method: 'GET'})
            .then(response => response.json())
            .then(data => this.setState({users: data}));
    }


    render() {
        const {users} = this.state;
        return (
            <div>
                <h1>User Listw</h1>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>{user.userName}</li>
                    ))}
                </ul>
            </div>
        );
    }
}