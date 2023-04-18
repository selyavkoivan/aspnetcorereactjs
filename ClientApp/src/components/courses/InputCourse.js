import React, {useState, useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes, faMagnifyingGlass, faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {Badge} from "reactstrap";

export class InputCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            course: {
                tags: []
            },
            tagName: null
        };
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
        fetch("/api/courses/course", {
            method: 'POST',
            body: JSON.stringify(this.state.course),
            headers: {"Content-Type": "application/json"}
        })
    }

    render() {
        const {course, tagName} = this.state;
        return (
            <div className="row m-0 ps-3 align-items-center justify-content-center">
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
                            <FontAwesomeIcon icon={faMagnifyingGlass}/>
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
                        <button className="btn btn-outline-danger">Отмена
                        </button>
                    </div>
                </div>
            </div>

        )

    }
}
                