import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class DeleteConfirmationModal extends React.Component {
    state = {
        courseName: '',
    };

    handleCourseNameChange = (event) => {
        this.setState({ courseName: event.target.value });
    };

    handleDelete = () => {
        this.props.onDelete(this.state.courseName);
    };

    render() {
        const { isOpen, toggle } = this.props;
        return (
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>Подтвердите удаление курса</ModalHeader>
                <ModalBody>
                    <p>Введите название курса, чтобы подтвердить удаление:</p>
                    <input
                        type="text"
                        className="form-control"
                        value={this.state.courseName}
                        onChange={this.handleCourseNameChange}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.handleDelete}>
                        Удалить
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Отмена
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default DeleteConfirmationModal;
