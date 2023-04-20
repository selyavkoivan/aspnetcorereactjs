import React, {useState, useEffect} from 'react';
import {TagCloud} from 'react-tagcloud';
import './Course.css';
import {InputCourse} from "./InputCourse";
import {InputSection} from "./InputSection";

export class Course extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            course: {},
            isLoaded: false,
            isEditMode: false,
            isSignIn: false,
            isCourse: true,
            inputSectionMode: false,
            sectionEditId: 0
        };
    }

    componentDidMount() {
        fetch('/api' + window.location.pathname, {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                this.setState({course: data, isLoaded: true});
                fetch('/api/students/me/' + data.courseId + '/isCourse', {method: 'GET'})
                    .then((response) => response.json())
                    .then((data) => {
                        this.setState({isCourse: data});
                    });
            });

        fetch('/api/users/me', {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                fetch('/api/students/' + data.user.userName + '/isStudent', {method: 'GET'})
                    .then((response) => response.json())
                    .then((data) => {
                        this.setState({isSignIn: data});
                    });
            });
    }

    toggleEditMode = _ => {
        this.setState(prevState => ({isEditMode: !prevState.isEditMode}));
    }


    handleGetCourse = _ => {
        const {course} = this.state
        fetch('/api/students/me/subscribe/' + course.courseId, {method: 'POST'})
            .then((response) => response.json())
            .then((data) => {
                window.location.replace('/profile/' + data.studentInfo.userName)
            });
    }

    handleUnsubCourse = _ => {
        const {course} = this.state
        fetch('/api/students/me/unsubscribe/' + course.courseId, {method: 'POST'})
            .then((response) => response.json())
            .then((data) => {
                window.location.replace('/profile/' + data.studentInfo.userName)
            })
    }

    toggleInputSectionAdd = _ => {

        this.setState({sectionEditId: null})
        this.setState(prevState => ({inputSectionMode: !prevState.inputSectionMode}));
    }

    toggleInputSectionEdit = sectionId => {
        this.setState({sectionEditId: sectionId})
        this.setState(prevState => ({inputSectionMode: !prevState.inputSectionMode}));
    }

    render() {
        const {course, isLoaded, isEditMode, isSignIn, isCourse, inputSectionMode, sectionEditId} = this.state;
        if (isLoaded) {
            const tagData = course.tags.map((tag) => ({
                value: tag.tagName,
                count: Math.floor(Math.random() * 10) + 1
            }));
            if (isEditMode) {
                return <InputCourse cancel={this.toggleEditMode} course={course} editMode={true}/>
            } else {
                return (
                    <div className="row m-0 ps-3 align-items-center justify-content-center">
                        <div className="p-2 col-11 row">
                            <div className="row col-12">
                                <div className="col-8">
                                    <h3>{course.courseName}</h3>
                                    <p>{course.courseDescription}</p>
                                    <button className="btn btn-secondary me-2" onClick={this.toggleEditMode}>Изменить
                                    </button>
                                    {isSignIn && !isCourse ? (
                                        <button className="btn btn-secondary me-2" onClick={this.handleGetCourse}>
                                            Подписаться на курс
                                        </button>
                                    ) : null}
                                    {isSignIn && isCourse ? (
                                        <button className="btn btn-secondary me-2" onClick={this.handleUnsubCourse}>
                                            Отписаться от курса
                                        </button>
                                    ) : null}
                                    {!inputSectionMode ? (
                                        <button className="btn btn-secondary me-2" onClick={this.toggleInputSectionAdd}>
                                            Добавить раздел
                                        </button>
                                    ) : null}
                                </div>
                                <div className="col-4">
                                    <div
                                        className="form-control p-0 tag-cloud form-control pb-2 d-flex justify-content-center align-items-center h-100"
                                        style={{backgroundColor: '#F6F6F6'}}>
                                        {tagData.length !== 0 ? (
                                            <TagCloud
                                                minSize={12}
                                                maxSize={35}
                                                tags={tagData}
                                                onClick={(tag) => alert(`'${tag.value}' was selected!`)}
                                            />
                                        ) : (
                                            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                                                <h3>тэгов нет</h3>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <hr className="mt-3"/>
                            </div>
                            {inputSectionMode ? (
                                <InputSection cancel={this.toggleInputSectionAdd}
                                              sectionId={this.state.sectionEditId ? this.state.sectionEditId : null}/>
                            ) : (
                                <div className="row col-12">
                                    <div className="col-8">
                                        <div className="form-control">
                                            {course.sections.map(section => (
                                                <div>
                                                    {section.sectionName}
                                                    <button className="btn btn-secondary me-2"
                                                            onClick={() => this.toggleInputSectionEdit(section.sectionId)}>
                                                        Изменить раздел
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-control">
                                            тут будет содержание
                                        </div>
                                    </div>
                                </div>)}
                        </div>
                    </div>
                );
            }

        }
    }
}
