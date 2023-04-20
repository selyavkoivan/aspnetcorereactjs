import React, {useState, useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes, faMagnifyingGlass, faPenToSquare, faPlusCircle, faCheck} from "@fortawesome/free-solid-svg-icons";
import {Badge} from "reactstrap";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

export class InputSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            section: {},
            tagName: null,
            isLoaded: false,
            isDeleteModalOpen: false,
        };

    }

    componentDidMount() {
        const {sectionId} = this.props;
        if (sectionId) {
            fetch('/api' + window.location.pathname + '/sections/' + sectionId, {method: 'GET'})
                .then((response) => response.json())
                .then((data) => {
                    this.setState({section: data, isLoaded: true});
                });
        }
    }


    onChangeSectionName = event => {
        this.setState(prevState => ({
            section: {
                ...prevState.section,
                sectionName: event.target.value
            }
        }));
    }

    onChangeSectionDescription = event => {
        this.setState(prevState => ({
            section: {
                ...prevState.section,
                sectionDescription: event.target.value
            }
        }));
    }

    handleSave = _ => { 
        const {sectionId} = this.props;
        fetch("/api" + window.location.pathname + '/sections', {
            method: sectionId ? 'PUT' : 'POST',
            body: JSON.stringify(this.state.section),
            headers: {"Content-Type": "application/json"}
        }).then(_ => window.location.reload())
    }

    handleToggleModal = _ => {
        this.setState(prevState => ({
            isDeleteModalOpen: !prevState.isDeleteModalOpen
        }))
    };

    handleDelete = (sectionName) => {
        const {section} = this.state

        if (sectionName === section.sectionName) {
            this.handleToggleModal();
            fetch("/api" + window.location.pathname + '/sections', {
                method: 'DELETE',
                body: JSON.stringify(this.state.section),
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
        const {section, isDeleteModalOpen} = this.state;
        const {sectionId} = this.props;
        return (
            <div className="row m-0 ps-3 align-items-center justify-content-center">
                {isDeleteModalOpen && sectionId ? (
                    <DeleteConfirmationModal targetClassName={'раздела'} onDelete={this.handleDelete}
                                             isOpen={isDeleteModalOpen} toggle={this.handleToggleModal}/>
                ) : null}
                <div className="p-2 col-12">
                    <h2 className="mb-3">Ввод данных раздела</h2>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="coursename-addon">@</span>
                        </div>
                        <input id="coursename" required type="text" className="form-control"
                               placeholder="Название раздела"
                               aria-label="Название раздела"
                               value={section.sectionName}
                               onChange={this.onChangeSectionName}
                               aria-describedby="coursename-addon"/>
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="courseDescription">Описание раздела</label>
                        <textarea className="form-control" id="courseDescription" rows="3"
                                  value={section.sectionDescription}
                                  onChange={this.onChangeSectionDescription}/>
                    </div>
                    <div className="d-flex justify-content-end mt-3">
                        <button className="btn btn-primary me-2"
                                onClick={this.handleSave}>Сохранить
                        </button>
                        <button className="btn btn-secondary me-2" onClick={this.handleCancel}>Отмена
                        </button>
                        {sectionId ? (
                            <button onClick={this.handleToggleModal} className="btn btn-danger"
                            >Удалить
                            </button>) : null}
                    </div>
                </div>
            </div>
        )
    }
}
                