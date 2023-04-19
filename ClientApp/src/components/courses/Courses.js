import React, {useState, useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSort, faMagnifyingGlass, faPlus} from "@fortawesome/free-solid-svg-icons";
import {Badge, Col} from "reactstrap";
import {CourseCard} from "./CourseCard";


export class Courses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            isLoaded: false,
            searchTerm: ""
        };
    }


    componentDidMount() {
        fetch('/api/courses', {method: 'GET'})
            .then(response => response.json())
            .then(data => this.setState({courses: data, isLoaded: true}));
    }

    onSearchChange(event) {
        this.setState({searchTerm: event.target.value})
    }

    handleSearch = event => {
        event.preventDefault()

        fetch('/api/courses/search/' + this.state.searchTerm.trim(), {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                this.setState({courses: data, isLoaded: true})
            });
    }

    handleFilter = event => {
        event.preventDefault()
    }


    render() {
        const {courses, isLoaded} = this.state;
        if (isLoaded) {
            return (
                <div className="row m-0 justify-content-center align-items-center">
                    <div className="col-10">
                        <div className="row m-0">
                            <form onSubmit={this.handleFilter} className="col-3">
                                <div className="text-center m-5">
                                    <h1>Фильтры</h1>
                                </div>
                                <div className="mb-3">
                                    <label className="m-0">Тестовое поле</label>
                                    <input type="text" className="m-0 form-control" placeholder="Размер"/>
                                </div>
                                <input type="submit" className="btn btn-outline-success col-12" value="Фильтр"/>
                            </form>
                            <div className="col-lg-8 col-md-12">
                                <form onSubmit={this.handleSearch} className="input-group mb-3">
                                    <input type="text" name="searchValue"
                                           className="form-control"
                                           placeholder="Поиск" value={this.state.searchTerm}
                                           onChange={e => this.onSearchChange(e)}/>
                                    <button id="search" className="btn btn-success" type="submit">
                                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                                    </button>
                                </form>
                                <div>
                                    <div className="m-1 btn-group sort-btn" id="sort-price">
                                        <button className="btn btn-outline-primary" data-sort="none">
                                            Цена <FontAwesomeIcon icon={faSort}/></button>
                                    </div>
                                    <div className="m-1 btn-group sort-btn" id="sort-count">
                                        <button className="btn btn-outline-primary" data-sort="none">
                                            Длительность <FontAwesomeIcon icon={faSort}/>
                                        </button>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row mt-4">
                                    {courses.map(course => (
                                        <Col md={6} className="mb-3">
                                            <CourseCard
                                            key={course.courseId}
                                            courseId={course.courseId}
                                            courseName={course.courseName}
                                            courseDescription={course.courseDescription}
                                            tags={course.tags}
                                        />
                                        </Col>
                                    ))}

                                    <Col md={6} className="mb-3">
                                        <a href="/courses/new"
                                           className="form-control pb-2 d-flex justify-content-center align-items-center h-100"
                                           style={{backgroundColor: '#F6F6F6'}}>
                                            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                                                <FontAwesomeIcon icon={faPlus} size="5x" color="#ccc"/>
                                            </div>
                                        </a>
                                    </Col>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}