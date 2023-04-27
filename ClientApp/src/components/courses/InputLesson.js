import React, {useState, useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes, faMagnifyingGlass, faPenToSquare, faPlusCircle, faCheck} from "@fortawesome/free-solid-svg-icons";
import {Badge} from "reactstrap";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

export class InputLesson extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lesson: {},
            tagName: null,
            isLoaded: false,
            isDeleteModalOpen: false,
            constLessonName: null
        };

    }

    componentDidMount() {
        const {sectionId, lessonId} = this.props;
        if (sectionId) {
            fetch('/api/lessons/' + lessonId, {method: 'GET'})
                .then((response) => response.json())
                .then((data) => {
                    this.setState({lesson: data, isLoaded: true, constLessonName: data.lessonName});
                });
        }
    }


    onChangeLessonName = event => {
        this.setState(prevState => ({
            lesson: {
                ...prevState.lesson,
                lessonName: event.target.value
            }
        }));
    }

    onChangeLessonDescription = event => {
        this.setState(prevState => ({
            lesson: {
                ...prevState.lesson,
                lessonDescription: event.target.value
            }
        }));
    }

    handleSave = _ => { 
        const {lessonId, sectionId} = this.props;
        const {lesson} = this.state;
        fetch('/api/lessons' + (lessonId ? '' : ('/sections/' + sectionId)), {
            method: lessonId ? 'PUT' : 'POST',
            body: JSON.stringify(lesson),
            headers: {"Content-Type": "application/json"}
        }).then(_  => window.location.reload())
    }

    handleToggleModal = _ => {
        this.setState(prevState => ({
            isDeleteModalOpen: !prevState.isDeleteModalOpen
        }))
    };

    handleDelete = (lessonName) => {
        const {lessonId, sectionId} = this.props;
        const {lesson, constLessonName} = this.state;

        if (lessonName === constLessonName) {
            this.handleToggleModal();
            fetch('/api/lessons/' + lessonId,  {
                method: 'DELETE',
                body: JSON.stringify(lesson),
                headers: {"Content-Type": "application/json"}
            }).then(response => {
                if(response.status === 200) {
                    window.location.reload()
                }
            })
        }
    };

    handleCancel = _ => {
        this.props.cancel()
    }
    
    render() {
        const {lesson, isDeleteModalOpen} = this.state;
        const {lessonId} = this.props;
        return (
            <div className="row m-0 ps-3 align-items-center justify-content-center">
                {isDeleteModalOpen && lessonId ? (
                    <DeleteConfirmationModal targetClassName={'занятия'} onDelete={this.handleDelete}
                                             isOpen={isDeleteModalOpen} toggle={this.handleToggleModal}/>
                ) : null}
                <div className="p-2 col-12">
                    <h2 className="mb-3">Ввод данных урока</h2>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="coursename-addon">@</span>
                        </div>
                        <input id="coursename" required type="text" className="form-control"
                               placeholder="Тема урока"
                               aria-label="Тема урока"
                               value={lesson.lessonName}
                               onChange={this.onChangeLessonName}
                               aria-describedby="coursename-addon"/>
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="courseDescription">Краткое описание темы урока</label>
                        <textarea className="form-control" id="courseDescription" rows="3"
                                  value={lesson.lessonDescription}
                                  onChange={this.onChangeLessonDescription}/>
                    </div>
                    <div className="d-flex justify-content-end mt-3">
                        <button className="btn btn-primary me-2"
                                onClick={this.handleSave}>Сохранить
                        </button>
                        <button className="btn btn-secondary me-2" onClick={this.handleCancel}>Отмена
                        </button>
                        {lessonId ? (
                            <button onClick={this.handleToggleModal} className="btn btn-danger"
                            >Удалить
                            </button>) : null}
                    </div>
                </div>
            </div>
        )
    }
}
                