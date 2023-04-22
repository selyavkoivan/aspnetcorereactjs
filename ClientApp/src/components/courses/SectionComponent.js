import React, {Component} from 'react';
import {Card, CardHeader, CardBody, Collapse, Button} from 'reactstrap';
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {InputLesson} from "./InputLesson";

export class SectionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false
        }
    }

    toggleCollapse = _ => {
        this.setState({collapse: !this.state.collapse});
    }

    render() {
        const {section, toggleInputSectionEdit, toggleInputLesson} = this.props;
        return (
            <Card>
                <CardHeader id="headingOne" onClick={this.toggleCollapse}>
                    <FontAwesomeIcon
                        icon={this.state.collapse ? faChevronUp : faChevronDown}
                        className="text-dark ms-2"
                    /> Раздел: {section.sectionName}
                </CardHeader>
                <Collapse isOpen={this.state.collapse}>
                    <CardBody>
                        <div>
                            <h3>{section.sectionName}</h3>
                            <p>{section.sectionDescription}</p>
                            <div>
                                <Button color="primary" className="me-2"
                                        onClick={_ => toggleInputLesson(section.sectionId)}>
                                    Добавить занятие
                                </Button>
                                <Button color="secondary" className="me-2"
                                        onClick={() => toggleInputSectionEdit(section.sectionId)}>
                                    Изменить раздел
                                </Button>
                            </div>
                            <hr/>
                            {section.lessons.map(lesson => (
                                <div>
                                    {lesson.lessonName} {lesson.lessonDescription}
                                    <Button color="primary" className="me-2"
                                            onClick={_ => toggleInputLesson(section.sectionId, lesson.lessonId)}>
                                        Добавить занятие
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardBody>
                </Collapse>
            </Card>
        );
    }
}
