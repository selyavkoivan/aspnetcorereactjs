import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

export class CourseSections extends Component {
    render() {
        const { course } = this.props;

        return (
            <div className="accordion" id="courseSections">
                {course.sections.map(section => (
                    <div className="accordion-item" key={section.sectionName}>
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${section.sectionName.replace(/\s+/g, '')}`} aria-expanded="true" aria-controls={`collapse${section.sectionName.replace(/\s+/g, '')}`} data-bs-parent="#courseSections">
                            {section.sectionName}
                            </button>
                        </h2>
                        <div id={`collapse${section.sectionName.replace(/\s+/g, '')}`} className="accordion-collapse collapse show" aria-labelledby={`heading${section.sectionName.replace(/\s+/g, '')}`} data-bs-parent="#courseSections">
                            <div className="accordion-body">
                                {section.lessons.map(lesson => (
                                    <div key={lesson.lessonName}>
                                        <button className="btn btn-outline-primary lesson-btn">{lesson.lessonName}</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}
