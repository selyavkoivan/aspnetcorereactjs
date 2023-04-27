import React, {useState, useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSort, faMagnifyingGlass, faPlus} from "@fortawesome/free-solid-svg-icons";
import {Badge, Col} from "reactstrap";
import {CourseCard} from "./CourseCard";


export class Lesson extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            isLoaded: false,
            searchTerm: "",
        };
    }


    componentDidMount() {
        fetch('/api/', {method: 'GET'})
            .then(response => response.json())
            .then(data => this.setState({courses: data, isLoaded: true}));
    }


    render() {
       
            return (
                <div className="row m-0 justify-content-center align-items-center">
                 
                </div>
            )
        
    }
}