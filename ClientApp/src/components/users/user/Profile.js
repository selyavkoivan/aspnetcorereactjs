import React from 'react';
import {Container, Row, Col, CardImg, Button, Badge} from 'reactstrap';
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            isUser: false,
            isLoaded: false
        };
    }

    componentDidMount() {
        fetch('/users' + window.location.pathname, {method: 'GET'})
            .then(response => {
                this.setState({isLoaded: true})
                if (response.status === 200) {
                    this.setState({isUser: true})
                }
                return response.json();
            })
            .then(data => this.setState({user: data}));
    }

    render() {
        const {user, isUser, isLoaded} = this.state;
        if (isLoaded && isUser) {
            return (
                <Container className="mt-5">
                    <Row>
                        <Col md={3}>
                            <CardImg src="https://avatars.githubusercontent.com/u/12345?v=4"
                                     className="rounded-circle"
                                     fluid/>
                            <h1 className="mt-3">Селявко Иван</h1>
                            <h6 className="text-muted">{user.email}</h6>
                            <hr/>
                            <p className="text-muted">ИЭФ ИСиТ(Э) 972304</p>
                            <hr/>
                            <Button variant="primary"><FontAwesomeIcon icon={faPenToSquare}/> Изменить</Button>
                        </Col>
                        <Col md={9}>
                            <h2>Мои курсы</h2>
                            <hr/>
                            <Row>
                                <Col md={6} className="mb-3">
                                    <div className="form-control">
                                        <h3>СТОЭИ ч. 2</h3>
                                        <p>Современные технологии обработки экономической информации.</p>
                                        <Badge>Данные</Badge>{' '}
                                        <Badge>Программирование</Badge>{' '}
                                        <Badge>1с</Badge>{' '}
                                        <Badge>Учет</Badge>{' '}
                                    </div>
                                </Col>
                                <Col md={6} className="mb-3">
                                    <div className="form-control">
                                        <h3>МППиИУ</h3>
                                        <p>Маркетинг программных продуктов и ИТ-услуг</p>
                                        <Badge>Маркетинг</Badge>{' '}
                                        <Badge>Экономика</Badge>{' '}
                                        <Badge>IT</Badge>{' '}
                                    </div>
                                </Col>
                                <Col md={6} className="mb-3">
                                    <div className="form-control">
                                        <h3>Маркетинг</h3>
                                        <p>Маркетинг</p>
                                        <Badge>Маркетинг</Badge>{' '}
                                        <Badge>Экономика</Badge>{' '}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}