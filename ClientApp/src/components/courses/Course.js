import React, {useState, useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSort, faMagnifyingGlass, faPlus} from "@fortawesome/free-solid-svg-icons";
import {Badge, Col} from "reactstrap";
import {CourseCard} from "./CourseCard";


export class Course extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            course: {},
            isLoaded: false
        };
    }


    componentDidMount() {
        fetch('/api' + window.location.pathname, {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                this.setState({course: data, isLoaded: true})
            });
    }


    render() {
        const {course, isLoaded} = this.state;
        if (isLoaded) {
            return (
                <div className="row m-0 justify-content-center align-items-center">
                    
                </div>
            )
        }
    }
}