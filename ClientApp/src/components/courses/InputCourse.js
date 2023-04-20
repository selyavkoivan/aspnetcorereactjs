import React, {useState, useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes, faMagnifyingGlass, faPenToSquare, faPlusCircle, faCheck} from "@fortawesome/free-solid-svg-icons";
import {Badge} from "reactstrap";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

export class InputCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            course: {
                tags: [],
            },
            tagName: null,
            isLoaded: false,
            isDeleteModalOpen: false,
        };

    }

    componentDidMount() {
        const {editMode} = this.props;
        if (editMode) {
            fetch('/api' + window.location.pathname, {method: 'GET'})
                .then((response) => response.json())
                .then((data) => {
                    this.setState({course: data, isLoaded: true});
                });
        }
    }


    onChangeCourseName = event => {
        this.setState(prevState => ({
            course: {
                ...prevState.course,
                courseName: event.target.value
            }
        }));
    }

    onChangeCourseDescription = event => {
        this.setState(prevState => ({
            course: {
                ...prevState.course,
                courseDescription: event.target.value
            }
        }));
    }

    onChangeTag = event => this.setState({tagName: event.target.value})

    handleAddTag = _ => {
        this.state.course.tags.push({tagName: this.state.tagName})
        this.setState({tagName: ''})
    }

    handleRemoveTag = tag => {
        const updatedTags = this.state.course.tags.filter(t => t.tagName !== tag);
        this.setState(prevState => ({
            course: {
                ...prevState.course,
                tags: updatedTags
            }
        }));
    }

    handleSave = _ => {
        const {editMode} = this.props;
        fetch("/api/courses/course", {
            method: editMode ? 'PUT' : 'POST',
            body: JSON.stringify(this.state.course),
            headers: {"Content-Type": "application/json"}
        }).then(response => response.json()).then(data => {
            window.location.replace('/courses/' + data)
        })
    }

    handleToggleModal = _ => {
        this.setState(prevState => ({
            isDeleteModalOpen: !prevState.isDeleteModalOpen
        }))
    };

    handleDelete = (courseName) => {
        const {course} = this.state

        if (courseName === course.courseName) {
            this.handleToggleModal();
            fetch('/api/courses/course', {
                method: 'DELETE',
                body: JSON.stringify(this.state.course),
                headers: {"Content-Type": "application/json"}
            }).then(response => {
                if (response.status === 200) {
                    window.location.replace('/courses')
                }
            })
        }
    };

    handleCancel = _ => {
        const {editMode} = this.props
        if (editMode) {
            this.props.cancel()
        } else {
            window.location.replace('/courses')
        }
    }


    render() {
        const {course, tagName, isDeleteModalOpen} = this.state;
        const {editMode} = this.props;
        return (

            <div className="row m-0 ps-3 align-items-center justify-content-center">
                {isDeleteModalOpen && editMode ? (
                    <DeleteConfirmationModal targetClassName={'курса'} onDelete={this.handleDelete}
                                             isOpen={isDeleteModalOpen} toggle={this.handleToggleModal}/>
                ) : null}

                <div className="p-2 col-8">
                    <h2 className="mb-3">ККККККККК к</h2>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="coursename-addon">@</span>
                        </div>
                        <input id="coursename" required type="text" className="form-control"
                               placeholder="Название курса"
                               aria-label="Название курса"
                               value={course.courseName}
                               onChange={this.onChangeCourseName}
                               aria-describedby="coursename-addon"/>
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="courseDescription">Описание курса</label>
                        <textarea className="form-control" id="courseDescription" rows="3"
                                  value={course.courseDescription}
                                  onChange={this.onChangeCourseDescription}/>
                    </div>
                    <div className="mt-3 p-0 input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="tag-addon">@</span>
                        </div>
                        <input id="tag" required type="text" className="form-control"
                               placeholder="Тэг"
                               aria-label="Тэг"
                               value={tagName}
                               onChange={this.onChangeTag}
                               aria-describedby="coursename-addon"/>
                        <button id="search" className="btn btn-success" onClick={this.handleAddTag}>
                            <FontAwesomeIcon icon={faCheck}/>
                        </button>
                    </div>
                    <div className="mt-3">
                        {course.tags.map(tag => (
                            <span>
                                <Badge>
                                    {tag.tagName}
                                    <button className="p-0 btn btn-link text-white btn-sm ms-2"
                                            onClick={_ => this.handleRemoveTag(tag.tagName)}>   
                                        <FontAwesomeIcon className="p-0 m-0" icon={faTimes}/>
                                    </button>
                                </Badge>{' '}
                            </span>
                        ))}
                    </div>
                    <div className="d-flex justify-content-end mt-3">
                        <button className="btn btn-primary me-2"
                                onClick={this.handleSave}>Сохранить
                        </button>
                        <button className="btn btn-secondary me-2" onClick={this.handleCancel}>Отмена
                        </button>
                        {editMode ? (
                            <button onClick={this.handleToggleModal} className="btn btn-danger"
                            >Удалить
                            </button>) : null}
                    </div>
                </div>
            </div>
        )
    }
}
                