import React, {useState, useEffect} from 'react';
import {Container, Row, Col, CardImg, Button, Badge} from 'reactstrap';
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {StudentCourses} from "./StudentCourses";
import {EditProfile} from "./EditProfile";

import {ToastContainer, toast} from 'react-toastify';
import ReactHtmlParser from 'html-react-parser';
import 'react-toastify/dist/ReactToastify.css';

export class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: {},
            student: {},
            isUser: false,
            isStudent: false
        };
    }

    componentDidMount() {
        fetch('/api/users' + window.location.pathname, {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                this.GetStudent(data.user);
                this.setState({userData: data, isUser: true})
            });
    }

    GetStudent(user) {
        fetch('/api/students/' + user.userName + '/isStudent', {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                this.setState({isStudent: data})
            });
    }

    handleEdit = (event) => {
        this.setState({isEdit: true})
    }

    toggleEdit = (e) => {
        if (e !== undefined) { // проверяем содержит ли параметр e текст
            toast.success(e, {
                position: 'top-right',
                autoClose: 10000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
        this.setState(prevState => ({isEdit: !prevState.isEdit}));
    }

    render() {
        const {userData, isUser, isStudent, isEdit} = this.state;
        if (isUser) {
            return (
                <Container className="mt-5">
                    <Row>
                        <Col md={3}>
                            <CardImg src={userData.user.avatarUrl}
                                     className=""
                                     fluid/>
                            <div>
                                <h1 className="mt-3 text-wrap" style={{wordBreak: 'break-word'}}>
                                    {userData.user.surname} {userData.user.name}
                                </h1>
                                <h6 className="text-muted">{userData.user.email}</h6>
                            </div>
                            <hr/>
                            {isEdit ? null : (
                                <Button variant="primary" onClick={this.handleEdit}>
                                    <FontAwesomeIcon icon={faPenToSquare}/> Изменить</Button>
                            )}
                        </Col>
                        <Col md={9}>
                            <ToastContainer/>
                            {isEdit ? (
                                <EditProfile toggleEdit={this.toggleEdit}/>
                            ) : (
                                isStudent ? (
                                    <StudentCourses/>
                                ) : null
                            )}
                        </Col>
                    < /Row>
                </Container>
            );
        }
    }
}