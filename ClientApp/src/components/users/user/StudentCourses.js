import React, {useState, useEffect} from 'react';
import {Container, Row, Col, CardImg, Button, Badge} from 'reactstrap';
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {CourseCard} from "../../courses/CourseCard";

export class StudentCourses extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            student: false,
            isStudent: false
        };
    }

    componentDidMount() {
        fetch('/api/students/' + window.location.pathname.split('/')[2], {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                this.setState({student: data, isStudent: true})
            });
    }

    render() {
        const {isStudent, student} = this.state;
        if (isStudent) {
            return (
                <div>
                    <h2>Мои курсы</h2>
                    <hr/>
                    {student.courses.length !== 0 ? (
                        <Col md={9}>
                            <Row>
                                {student.courses.map(course => (
                                    <CourseCard
                                        key={course.courseId}
                                        courseId={course.courseId}
                                        courseName={course.courseName}
                                        courseDescription={course.courseDescription}
                                        tags={course.tags}
                                    />
                                ))}
                            </Row>
                        </Col>
                    ) : (
                        <p>Список курсов пуст</p>
                    )}
                </div>
            );
        }
    }
}