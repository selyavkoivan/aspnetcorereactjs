import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEnvelope} from "@fortawesome/free-regular-svg-icons";

export class Email extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-6">
                        <div className="m-5 p-5 text-center">
                            <h1 className="display-1"><FontAwesomeIcon icon={faEnvelope}/></h1>
                            <p>Проверьте свою почту, там письмо))</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}